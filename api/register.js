export default async function handler(req, res) {
  // CORS Headers in case they are needed, though usually Vercel handles this if it's same-origin
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    // The Google Apps Script URL should be placed in Vercel Environment Variables as GOOGLE_SCRIPT_URL
    // We include a fallback here just in case, but you should eventually remove the fallback from code!
    const ENDPOINT = process.env.GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbypY4VYIksNx8K1H1Wjj5URZepCx8VBCBfxylM5k5dHYcmRA0i3cMTzke37JlDqRxzC/exec';

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        // text/plain is required for Google Apps Script to prevent CORS preflight block on their end
        'Content-Type': 'text/plain;charset=utf-8',
      },
      // Vercel parses req.body as an object if the client sends application/json
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    });

    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Google response:", text);
      return res.status(502).json({ 
        success: false, 
        error: 'Invalid response from backend server.' 
      });
    }

    if (data.success) {
      return res.status(200).json({
        success: true,
        id: data.id,
        amount: data.amount ?? 0,
        timestamp: data.timestamp
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        error: data.error || 'Server rejected registration.' 
      });
    }
  } catch (error) {
    console.error('Registration Proxy Error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
