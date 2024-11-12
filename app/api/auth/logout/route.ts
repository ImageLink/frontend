import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // Clear auth cookie
    cookies().delete('auth-token');

    return NextResponse.json({
      message: 'Logged out successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}