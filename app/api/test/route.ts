import { NextResponse } from 'next/server';
import { JWT_SECRET } from '@/lib/auth';

export async function GET(request: Request) {
  // Check JWT configuration
  const jwtInfo = {
    jwt_secret: JWT_SECRET,
    jwt_secret_length: JWT_SECRET.length,
    jwt_secret_type: typeof JWT_SECRET,
    env_jwt_secret: process.env.JWT_SECRET || 'not set',
    node_env: process.env.NODE_ENV || 'not set'
  };
  
  // Check cookie settings
  const cookieSettings = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  };
  
  return NextResponse.json({
    message: 'JWT and cookie configuration',
    jwt: jwtInfo,
    cookie: cookieSettings,
    timestamp: new Date().toISOString()
  });
} 