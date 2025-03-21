import { NextResponse } from 'next/server';
import { validateCredentials, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, password } = body;
    
    console.log('Login attempt for:', email);
    
    // Validate credentials
    if (!validateCredentials(email, password)) {
      console.log('Invalid credentials for:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    console.log('Credentials validated successfully');
    
    try {
      // Generate JWT token (async with jose)
      console.log('Generating token...');
      const token = await generateToken();
      console.log('Token generated successfully, length:', token.length);
      
      // Create JSON response
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });
      
      // Set the cookie with simpler parameters
      console.log('Setting auth_token cookie...');
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      // Set cache control headers
      response.headers.set('Cache-Control', 'no-store');
      
      console.log('Login successful, returning response');
      return response;
    } catch (tokenError) {
      console.error('Token generation failed:', tokenError);
      return NextResponse.json(
        { success: false, message: 'Authentication failed: Unable to create session' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 