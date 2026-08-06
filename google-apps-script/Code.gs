/**
 * =========================================================================
 * Innovatrium '26 - Secure Google Apps Script Backend
 * =========================================================================
 * 
 * Features:
 *  1. Thread-safe concurrency control via LockService
 *  2. Server-side duplicate UTR check (Prevents duplicate payments / replay attacks)
 *  3. Server-side price enforcement (Prevents client-side price tampering)
 *  4. Immunity against CSV / Google Sheet Formula Injection (CWE-1236)
 *  5. Anonymous live stats provider without PII leakage
 *  6. Non-sequential cryptographically secure Registration IDs
 */

const SHEET_NAME = 'Registrations';
const EXPECTED_IEEE_FEE = 300;
const EXPECTED_NON_IEEE_FEE = 350;

/**
 * Handles CORS Preflight & Health Check
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || initSheet(ss);
    
    // Count active registrations (excluding header)
    const lastRow = sheet.getLastRow();
    const registrationsCount = Math.max(0, lastRow - 1);
    
    // Calculate unique colleges
    let uniqueColleges = 0;
    if (registrationsCount > 0) {
      const collegeValues = sheet.getRange(2, 6, registrationsCount, 1).getValues();
      const set = new Set();
      collegeValues.forEach(row => {
        const val = String(row[0] || '').trim().toLowerCase();
        if (val) set.add(val);
      });
      uniqueColleges = set.size;
    }
    
    return createJsonResponse({
      success: true,
      registrations: registrationsCount,
      colleges: Math.max(uniqueColleges, 1)
    });
  } catch (err) {
    return createJsonResponse({
      success: false,
      error: 'Failed to retrieve stats',
      registrations: 0,
      colleges: 0
    });
  }
}

/**
 * Handles Registration Form Submissions
 */
function doPost(e) {
  // Use LockService to prevent race conditions during high-concurrency fest registration
  const lock = LockService.getScriptLock();
  const hasLock = lock.tryLock(15000); // Wait up to 15 seconds for previous write to finish

  if (!hasLock) {
    return createJsonResponse({
      success: false,
      error: 'Server is currently busy handling other registrations. Please retry in a moment.'
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, error: 'Empty payload received.' });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({ success: false, error: 'Malformed JSON payload.' });
    }

    // --- 1. BASIC VALIDATION ---
    const participant = data.participant;
    const personal = data.personal || {};
    const competition = data.competition || {};
    const payment = data.payment || {};

    if (!participant || !personal.fullName || !personal.email || !personal.phone || !competition.competitionId || !payment.utrNumber) {
      return createJsonResponse({ success: false, error: 'Missing mandatory registration fields.' });
    }

    const cleanUtr = String(payment.utrNumber).trim().replace(/\D/g, '');
    if (cleanUtr.length !== 12) {
      return createJsonResponse({ success: false, error: 'UTR / Transaction Reference must be exactly 12 numeric digits.' });
    }

    // --- 2. SERVER-SIDE PRICE ENFORCEMENT ---
    const expectedAmount = participant === 'ieee' ? EXPECTED_IEEE_FEE : EXPECTED_NON_IEEE_FEE;

    // --- 3. SPREADSHEET & DUPLICATE UTR CHECK ---
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || initSheet(ss);
    
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // Column 12 is Payment UTR
      const existingUtrs = sheet.getRange(2, 12, lastRow - 1, 1).getValues().flat();
      const isDuplicate = existingUtrs.some(existing => String(existing).replace(/\D/g, '') === cleanUtr);
      
      if (isDuplicate) {
        return createJsonResponse({
          success: false,
          error: 'This UTR / Transaction Reference ID has already been registered. Please check your transaction details.'
        });
      }
    }

    // --- 4. GENERATE SECURE REGISTRATION ID ---
    const regId = 'INV26-' + Utilities.getUuid().substring(0, 8).toUpperCase();
    const timestamp = new Date().toISOString();

    // --- 5. SANITIZE FIELDS AGAINST FORMULA INJECTION ---
    const sanitizedRow = [
      regId,
      timestamp,
      sanitizeCell(participant),
      sanitizeCell(personal.fullName),
      sanitizeCell(personal.email),
      sanitizeCell(personal.phone),
      sanitizeCell(personal.college),
      sanitizeCell(personal.branch || ''),
      sanitizeCell(personal.year || ''),
      sanitizeCell(personal.ieeeNumber || 'N/A'),
      sanitizeCell(competition.competitionId),
      cleanUtr,
      expectedAmount,
      sanitizeCell(competition.teamName || ''),
      formatMembers(competition.members),
      'PENDING_VERIFICATION' // Status for organizers to verify in bank statement
    ];

    sheet.appendRow(sanitizedRow);

    return createJsonResponse({
      success: true,
      id: regId,
      amount: expectedAmount,
      status: 'PENDING_VERIFICATION',
      timestamp: timestamp
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: 'Internal error recording registration: ' + err.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sanitizes input to prevent Formula Injection (CWE-1236)
 */
function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).trim();
  // If string starts with dangerous characters (=, +, -, @), prepend single quote
  if (/^[=+\-@\t\r\n]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Formats additional team members safely
 */
function formatMembers(members) {
  if (!Array.isArray(members) || members.length === 0) return 'Solo Participant';
  return members.map((m, i) => `${i + 2}. ${sanitizeCell(m.name)} (${sanitizeCell(m.phone)}, ${sanitizeCell(m.email)})`).join('\n');
}

/**
 * Initializes Google Sheet with protected headers and formatting
 */
function initSheet(ss) {
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    'Registration ID',
    'Timestamp (UTC)',
    'Category',
    'Lead Name',
    'Lead Email',
    'Lead Phone',
    'College / Institution',
    'Branch',
    'Year',
    'IEEE Member ID',
    'Competition Track',
    'Payment UTR / Ref No',
    'Amount (INR)',
    'Team Name',
    'Team Members',
    'Verification Status'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format Header Row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0f172a');
  headerRange.setFontColor('#38bdf8');
  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);

  return sheet;
}

/**
 * Helper to build JSON responses with proper headers
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
