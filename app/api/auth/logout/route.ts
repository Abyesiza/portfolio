import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Create response that redirects to home page
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Clear the auth token cookie
  response.cookies.delete('auth_token');
  
  return response;
}

export async function POST(request: Request) {
  // Create JSON response
  const response = NextResponse.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
  
  // Clear the auth token cookie
  response.cookies.delete('auth_token');
  
  // Set cache control headers
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  
  return response;
} 