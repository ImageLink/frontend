import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protected routes
  const protectedPaths = [
    '/dashboard',
    '/edit-listing',
    '/list-website',
    '/submit-requirement',
    '/messages'
  ];

  // Admin routes
  const adminPaths = ['/admin'];

  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  const isAdminPath = adminPaths.some(path => 
    pathname.startsWith(path)
  );

  // Get token from cookies
  const token = req.cookies.get('auth-token')?.value;

  // Handle protected routes
  if (isProtectedPath || isAdminPath) {
    if (!token) {
      const redirectUrl = new URL(isAdminPath ? '/er409' : '/login', req.url);
      redirectUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    try {
      const decoded = verify(token, JWT_SECRET) as { role: string };

      // Check admin access
      if (isAdminPath && decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (error) {
      // Invalid token
      const redirectUrl = new URL(isAdminPath ? '/er409' : '/login', req.url);
      redirectUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect authenticated users from auth pages
  if (token) {
    try {
      const decoded = verify(token, JWT_SECRET) as { role: string };

      if (pathname === '/login' || pathname === '/signup') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      if (pathname === '/er409' && decoded.role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    } catch (error) {
      // Invalid token, allow access to auth pages
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/edit-listing/:path*',
    '/list-website',
    '/submit-requirement',
    '/messages/:path*',
    '/login',
    '/signup',
    '/er409'
  ],
};