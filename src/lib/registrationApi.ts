// The endpoint URL should ideally come from an environment variable.
// For now, it will return placeholder data if the endpoint is not set.
const ENDPOINT = (import.meta as any).env.VITE_REGISTRATION_ENDPOINT || '';

export async function submitRegistration(payload: any) {
  if (!ENDPOINT) {
    console.warn('Registration endpoint not configured. Simulating success.');
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
  }
  
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function getLiveStats() {
  if (!ENDPOINT) {
    return { registrations: 42, colleges: 8 };
  }
  const res = await fetch(ENDPOINT);
  return res.json();
}
