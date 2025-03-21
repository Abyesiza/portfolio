'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({ className = '', children }: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Call the logout API
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      
      // Force a hard navigation to clear state
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback - redirect anyway
      window.location.href = '/login';
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`${className}`}
      type="button"
    >
      {isLoggingOut ? 'Logging out...' : children || 'Logout'}
    </button>
  );
} 