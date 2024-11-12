import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, code, method } = await req.json();

    // Normalize URL
    const baseUrl = url.replace(/\/$/, '');
    
    // Fetch based on verification method
    const verifyUrl = method === 'meta' 
      ? baseUrl
      : `${baseUrl}/imagelink-verify.html`;

    const response = await fetch(verifyUrl);
    const html = await response.text();

    let verified = false;
    if (method === 'meta') {
      verified = html.includes(`<meta name="imagelink-verify" content="${code}"`);
    } else {
      verified = html.includes(code);
    }

    if (verified) {
      // After verification, fetch SEO metrics
      const seoResponse = await fetch('/api/seo-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: new URL(baseUrl).hostname }),
      });

      const seoData = await seoResponse.json();

      return NextResponse.json({
        verified: true,
        seoMetrics: seoData,
      });
    } else {
      return NextResponse.json(
        { verified: false, error: 'Verification code not found' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { verified: false, error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}