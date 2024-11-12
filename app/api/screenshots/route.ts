import { NextResponse } from 'next/server';

const SCREENSHOT_API_KEY = process.env.SCREENSHOT_API_KEY;
const SCREENSHOT_API_URL = 'https://api.screenshotapi.net/screenshot';

export async function POST(req: Request) {
  try {
    const { url, width, height, full_page, delay } = await req.json();

    const params = new URLSearchParams({
      token: SCREENSHOT_API_KEY!,
      url,
      width: width.toString(),
      height: height.toString(),
      full_page: full_page.toString(),
      delay: delay.toString(),
      output: 'json',
      fresh: 'true',
    });

    const response = await fetch(`${SCREENSHOT_API_URL}?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to capture screenshot');
    }

    return NextResponse.json({ screenshot: data.screenshot });
  } catch (error: any) {
    console.error('Screenshot error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
}