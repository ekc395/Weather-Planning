// AuthContext for managing user authentication state
// Created by: Kris Tong, Ethan Chen, Emily Kim

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService';
import { AuthContextType, User, AuthResult } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, displayName: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    
    const result = await authService.signUp(email, password, displayName);
    
    if (!result.success) {
      setError(result.error || 'Sign up failed');
    }
    
    setLoading(false);
    return result;
  };

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    
    const result = await authService.signIn(email, password);
    
    if (!result.success) {
      setError(result.error || 'Sign in failed');
    }
    
    setLoading(false);
    return result;
  };

  const signOut = async (): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    
    const result = await authService.signOut();
    
    if (!result.success) {
      setError(result.error || 'Sign out failed');
    }
    
    setLoading(false);
    return result;
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
