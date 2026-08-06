const ENDPOINT = (import.meta as any).env.VITE_REGISTRATION_ENDPOINT || '';

export async function submitRegistration(payload: any) {
  if (!ENDPOINT) {
    console.warn('Registration endpoint not configured. Simulating success.');
    const mockId = 'REG-' + Math.floor(100000 + Math.random() * 900000);
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, id: mockId }), 1000));
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error('Error submitting registration:', error);
    return { success: false, error: 'Network request failed' };
  }
}

export async function getLiveStats() {
  if (!ENDPOINT) {
    return { registrations: 42, colleges: 12 };
  }

  try {
    const res = await fetch(ENDPOINT);
    const contentType = res.headers.get('content-type');

    // Protects against HTML error pages from Google returning SyntaxError
    if (!res.ok || !contentType || !contentType.includes('application/json')) {
      console.warn('Endpoint returned non-JSON response. Falling back to default stats.');
      return { registrations: 42, colleges: 12 };
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching live stats:', error);
    return { registrations: 42, colleges: 12 };
  }
}