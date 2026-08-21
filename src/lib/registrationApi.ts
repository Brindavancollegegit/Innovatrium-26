import { validateAndSanitizeRegistration, RawRegistrationPayload } from './validation';

const DEFAULT_ENDPOINT = '/api/register';
const ENDPOINT = (import.meta as any).env.VITE_REGISTRATION_ENDPOINT || DEFAULT_ENDPOINT;

export interface SubmissionResponse {
  success: boolean;
  id?: string;
  amount?: number;
  error?: string;
  timestamp?: string;
}

export async function submitRegistration(payload: RawRegistrationPayload): Promise<SubmissionResponse> {
  // 1. Client-side Validation & Sanitization
  const validation = validateAndSanitizeRegistration(payload);
  if (!validation.isValid || !validation.sanitized) {
    const firstErrorMessage = Object.values(validation.errors)[0] || 'Invalid form input.';
    return { success: false, error: firstErrorMessage };
  }

  const sanitizedPayload = validation.sanitized;

  // 3. Secure Dispatch to Vercel Serverless Function Proxy
  try {
    const isGoogle = ENDPOINT.includes('script.google.com');
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': isGoogle ? 'text/plain;charset=utf-8' : 'application/json',
      },
      body: JSON.stringify(sanitizedPayload),
    });

    const text = await res.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      if (text.includes('Google Accounts') || text.includes('accounts.google.com')) {
        return {
          success: false,
          error: 'Google Apps Script deployment access must be set to "Anyone" in Google Apps Script settings.',
        };
      }
      return {
        success: false,
        error: 'Unable to parse response from registration server.',
      };
    }

    if (data.success) {
      return {
        success: true,
        id: data.id,
        amount: data.amount ?? 0,
        timestamp: data.timestamp || sanitizedPayload.timestamp,
      };
    } else {
      return {
        success: false,
        error: data.error || 'Registration could not be completed by the server.',
      };
    }
  } catch (error: any) {
    console.error('Error submitting registration to Google Apps Script:', error);
    return {
      success: false,
      error: 'Network connectivity error. Please check your internet connection and try again.',
    };
  }
}

export async function getLiveStats(): Promise<{ registrations: number; colleges: number }> {
  if (!ENDPOINT) {
    return { registrations: 0, colleges: 0 };
  }

  try {
    const res = await fetch(ENDPOINT, { method: 'GET', redirect: 'follow' });
    const contentType = res.headers.get('content-type');

    if (!res.ok || !contentType || !contentType.includes('application/json')) {
      return { registrations: 0, colleges: 0 };
    }

    const data = await res.json();
    return {
      registrations: Number(data.registrations) || 0,
      colleges: Number(data.colleges) || 0,
    };
  } catch (error) {
    console.error('Error fetching live stats from Google Apps Script:', error);
    return { registrations: 0, colleges: 0 };
  }
}