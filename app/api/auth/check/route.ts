import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    // Get the auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json({ 
        authenticated: false, 
        message: 'No auth token found'
      });
    }
    
    // Verify the token (now returns boolean)
    const isValid = await verifyToken(token);
    
    if (!isValid) {
      return NextResponse.json({ 
        authenticated: false, 
        message: 'Invalid auth token'
      });
    }
    
    return NextResponse.json({
      authenticated: true,
      user: {
        email: 'abyesizajoel@gmail.com',
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ 
      authenticated: false, 
      message: 'Error checking authentication'
    });
  }
} 