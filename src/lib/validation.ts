/**
 * Security & Input Validation Layer for Innovatrium '26
 * 
 * 1. Sanitization against Google Sheets / CSV Formula Injection (CWE-1236)
 * 2. Strict type-safe schema checks for all participant and payment inputs
 * 3. Prevention of XSS and control-character attacks
 */

export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  year: string;
  ieeeNumber?: string;
}

export interface TeamMember {
  name: string;
  email: string;
  phone: string;
}

export interface CompetitionDetails {
  competitionId: string;
  teamName: string;
  members: TeamMember[];
}

export interface PaymentDetails {
  utrNumber: string;
  totalAmount: number;
}

export interface RawRegistrationPayload {
  participant: 'ieee' | 'non-ieee';
  personal: PersonalDetails;
  competition: CompetitionDetails;
  payment: PaymentDetails;
  timestamp?: string;
  clientNonce?: string;
}

export interface SanitizedRegistrationPayload {
  participant: 'ieee' | 'non-ieee';
  personal: PersonalDetails;
  competition: CompetitionDetails;
  payment: PaymentDetails;
  timestamp: string;
  clientNonce: string;
}

/**
 * Neutralizes Formula Injection (CSV / Sheet Injection)
 * Prevents execution of malicious formulas (=cmd|..., +..., -..., @...) in Google Sheets
 */
export function sanitizeForSheet(input: unknown): string {
  if (typeof input !== 'string') {
    return String(input ?? '').trim();
  }
  
  // Remove dangerous control characters and non-printable bytes
  let clean = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  
  // Strip dangerous HTML/XML tags
  clean = clean.replace(/[<>]/g, '');

  // Prepend single quote (') if string starts with formula trigger characters (=, +, -, @, tab, newline)
  if (/^[=+\-@\t\r\n]/.test(clean)) {
    return `'${clean}`;
  }
  
  return clean;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 100;
}

export function validatePhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  // Validates standard 10-digit mobile numbers starting with 6-9
  return /^[6-9]\d{9}$/.test(digitsOnly);
}

export function validateUTR(utr: string): boolean {
  const cleanUtr = utr.trim().replace(/\D/g, '');
  // Standard Indian Banking UTR / UPI Reference is strictly 12 digits
  return /^\d{12}$/.test(cleanUtr);
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: SanitizedRegistrationPayload;
}

export function validateAndSanitizeRegistration(payload: RawRegistrationPayload): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Participant Type Check
  if (payload.participant !== 'ieee' && payload.participant !== 'non-ieee') {
    errors.participant = 'Invalid participant category.';
  }

  // 2. Personal Information Check
  const p = payload.personal || ({} as PersonalDetails);
  const fullName = sanitizeForSheet(p.fullName);
  if (!fullName || fullName.length < 2 || fullName.length > 80) {
    errors.fullName = 'Full Name must be between 2 and 80 characters.';
  }

  const email = sanitizeForSheet(p.email);
  if (!validateEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  const phone = p.phone?.replace(/\D/g, '') || '';
  if (!validatePhone(phone)) {
    errors.phone = 'Please provide a valid 10-digit mobile number.';
  }

  const college = sanitizeForSheet(p.college);
  if (!college || college.length < 2 || college.length > 120) {
    errors.college = 'Please enter a valid institution/college name.';
  }

  const branch = sanitizeForSheet(p.branch);
  if (!branch || branch.length > 60) {
    errors.branch = 'Please select a valid branch/department.';
  }

  const year = sanitizeForSheet(p.year);
  if (!year || year.length > 20) {
    errors.year = 'Please select your current year of study.';
  }

  let ieeeNumber = '';
  if (payload.participant === 'ieee') {
    ieeeNumber = sanitizeForSheet(p.ieeeNumber);
    if (!ieeeNumber || ieeeNumber.length < 5 || ieeeNumber.length > 25) {
      errors.ieeeNumber = 'Please enter a valid IEEE Membership Number.';
    }
  }

  // 3. Competition & Team Check
  const c = payload.competition || ({} as CompetitionDetails);
  const competitionId = sanitizeForSheet(c.competitionId);
  if (!competitionId) {
    errors.competitionId = 'Please select a competition track.';
  }

  const teamName = sanitizeForSheet(c.teamName);
  if (!teamName || teamName.length < 2 || teamName.length > 50) {
    errors.teamName = 'Team name must be between 2 and 50 characters.';
  }

  const sanitizedMembers: TeamMember[] = [];
  if (Array.isArray(c.members)) {
    if (c.members.length > 5) {
      errors.members = 'Maximum team size exceeded (max 5 additional members).';
    }
    
    c.members.forEach((m, idx) => {
      const mName = sanitizeForSheet(m.name);
      const mEmail = sanitizeForSheet(m.email);
      const mPhone = m.phone?.replace(/\D/g, '') || '';

      if (!mName || mName.length < 2) {
        errors[`member_${idx}_name`] = `Member ${idx + 2} name is required.`;
      }
      if (!validateEmail(mEmail)) {
        errors[`member_${idx}_email`] = `Member ${idx + 2} email is invalid.`;
      }
      if (!validatePhone(mPhone)) {
        errors[`member_${idx}_phone`] = `Member ${idx + 2} phone must be 10 digits.`;
      }

      sanitizedMembers.push({
        name: mName,
        email: mEmail,
        phone: mPhone,
      });
    });
  }

  // 4. Payment Check
  const pay = payload.payment || ({} as PaymentDetails);
  const cleanUtr = pay.utrNumber?.replace(/\D/g, '') || '';
  if (!validateUTR(cleanUtr)) {
    errors.utrNumber = 'Invalid UTR / Transaction Reference. Must be exactly 12 numeric digits.';
  }

  // Calculate expected fee
  const expectedFee = payload.participant === 'ieee' ? 300 : 350;
  if (pay.totalAmount !== expectedFee) {
    errors.totalAmount = `Incorrect payment amount. Expected ₹${expectedFee}.`;
  }

  const isValid = Object.keys(errors).length === 0;

  if (!isValid) {
    return { isValid, errors };
  }

  const sanitized: SanitizedRegistrationPayload = {
    participant: payload.participant,
    personal: {
      fullName,
      email,
      phone,
      college,
      branch,
      year,
      ...(ieeeNumber ? { ieeeNumber } : {}),
    },
    competition: {
      competitionId,
      teamName,
      members: sanitizedMembers,
    },
    payment: {
      utrNumber: cleanUtr,
      totalAmount: expectedFee,
    },
    timestamp: payload.timestamp || new Date().toISOString(),
    clientNonce: payload.clientNonce || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  };

  return {
    isValid: true,
    errors: {},
    sanitized,
  };
}
