import { NextResponse } from 'next/server';
import { sendVerificationToken, verifyToken } from '@/lib/twilio';

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (code) {
      // Verify the code
      const result = await verifyToken(phone, code);
      return NextResponse.json(result);
    } else {
      // Send new verification code
      const result = await sendVerificationToken(phone);
      return NextResponse.json(result);
    }
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}