import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/auth-service';
import { sendVerificationToken } from '@/lib/twilio';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Send verification code
    const verificationResult = await sendVerificationToken(data.phone);
    
    if (!verificationResult.success) {
      return NextResponse.json(
        { error: verificationResult.error },
        { status: 400 }
      );
    }

    const { user, error } = await AuthService.signUp(data);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}