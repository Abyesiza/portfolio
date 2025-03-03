import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

// Hardcoded credentials
const ADMIN_EMAIL = 'abyesizajoel@gmail.com';
const ADMIN_PASSWORD = 'A1BiPerfect@';
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

export async function POST(request: Request) {
  try {
    console.log("=== LOGIN API CALLED ===");
    console.log("JWT_SECRET length:", JWT_SECRET.length);
    
    const body = await request.json();
    const { email, password } = body;
    console.log("Login attempt for email:", email);

    // Validate credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      console.log("Invalid credentials provided");
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log("Credentials validated successfully");
    
    // Create a JWT token
    const payload = { email, role: 'admin' };
    console.log("Creating JWT token with payload:", payload);
    const token = sign(
      payload,
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );
    console.log("JWT token created successfully");
    console.log("Token length:", token.length);

    // Create response
    const response = NextResponse.json({ 
      success: true,
      message: 'Login successful',
      user: { email, role: 'admin' }
    });
    
    // Set the token as a cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
      sameSite: 'lax',
    });
    console.log("Set auth_token cookie in response");
    
    // Debug cookie info
    const cookieStr = response.headers.get('Set-Cookie');
    console.log("Set-Cookie header present:", !!cookieStr);
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 