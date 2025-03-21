import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

// Define auth protected routes
const protectedRoutes = ['/dashboard', '/projects', '/blog', '/about', '/contact'];
const authRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log('Path:', path, 'Method:', request.method);
  
  // Get auth token from cookies
  const token = request.cookies.get('auth_token')?.value;
  const isTokenPresent = !!token;
  console.log('Token present:', isTokenPresent);
  
  // Handle protected routes
  if (protectedRoutes.some(route => path.startsWith(route))) {
    // If no token, redirect to login
    if (!isTokenPresent) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Verify token
    const isTokenValid = await verifyToken(token);
    console.log('Token verification result:', isTokenValid);
    
    // If token verification fails, redirect to login
    if (!isTokenValid) {
      console.log('Invalid token, redirecting to login');
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }
    
    console.log('Valid token, proceeding to protected route');
    return NextResponse.next();
  }
  
  // Handle auth routes (login)
  if (authRoutes.some(route => path.startsWith(route))) {
    // If token exists and is valid, redirect to dashboard
    if (isTokenPresent) {
      const isTokenValid = await verifyToken(token);
      console.log('Accessing login page with token, validity:', isTokenValid);
      
      if (isTokenValid) {
        console.log('Valid token on login page, redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    
    console.log('Accessing login page');
    return NextResponse.next();
  }
  
  // For all other routes, simply proceed
  return NextResponse.next();
}

// Configure middleware to run only on specified routes
export const config = {
  matcher: [
    '/dashboard/:path*', // All dashboard routes
    '/login',            // Login page
  ],
}; 