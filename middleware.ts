import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

// Simplified middleware that only protects the dashboard
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log("=== MIDDLEWARE CALLED ===");
  console.log("Checking path:", pathname);
  console.log("Cookies present:", request.cookies.size > 0);
  
  // Only protect the dashboard routes
  if (pathname.startsWith('/dashboard')) {
    console.log("Dashboard route detected");
    
    // Get the token from the cookies
    const token = request.cookies.get('auth_token')?.value;
    console.log("Auth token present:", !!token);
    
    // If no token, redirect to login
    if (!token) {
      console.log("No auth token, redirecting to login");
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    try {
      // Very basic token verification, just check if it exists
      // In a real app, you'd want to verify the token is valid
      console.log("Token exists, allowing access to dashboard");
      return NextResponse.next();
    } catch (error) {
      console.error('Error in middleware:', error);
      // If token verification fails, redirect to login
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  // All other routes proceed normally
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    // Only run on dashboard paths
    '/dashboard/:path*',
  ],
}; 