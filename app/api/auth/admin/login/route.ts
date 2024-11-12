import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AuthService } from '@/lib/auth/auth-service';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { token, error } = await AuthService.signIn(email, password);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    // Verify admin role
    const { user: adminUser } = await AuthService.verifyToken(token!);
    
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Set auth cookie
    cookies().set('auth-token', token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return NextResponse.json({
      user: {
        id: adminUser._id,
        email: adminUser.email,
        username: adminUser.username,
        role: adminUser.role,
      },
    });
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}