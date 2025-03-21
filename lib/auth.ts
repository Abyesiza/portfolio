import * as jose from 'jose';

// Demo credentials - hardcoded for single-account use case
export const ADMIN_EMAIL = 'abyesizajoel@gmail.com';
export const ADMIN_PASSWORD = 'A1BiPerfect@';

// Use environment variable for JWT_SECRET with fallback for development
const secretKey = process.env.JWT_SECRET || 'abyesiza-portfolio-dashboard-secret-key';
export const JWT_SECRET = new TextEncoder().encode(secretKey);

export interface UserData {
  email: string;
  role: string;
}

/**
 * Generate a JWT token for the admin user
 */
export async function generateToken(): Promise<string> {
  try {
    console.log('Generating token...');
    
    // Create a simple payload
    const payload = {
      email: ADMIN_EMAIL,
      role: 'admin'
    };
    
    // Sign with jose library (Edge Runtime compatible)
    const token = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);
    
    console.log('Token generated successfully');
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate authentication token');
  }
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    console.log('Verifying token...');
    
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    console.log('Token verified successfully for:', payload.email);
    return true;
  } catch (error) {
    console.error('Token verification error:', error.message);
    return false;
  }
}

/**
 * Validate login credentials
 */
export function validateCredentials(email: string, password: string): boolean {
  // Case insensitive email comparison but case sensitive password
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && 
         password === ADMIN_PASSWORD;
} 