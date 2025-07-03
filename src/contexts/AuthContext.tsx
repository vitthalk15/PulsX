
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('PulsX_token');
    if (token) {
      // In a real app, validate token with backend
      try {
        const userData = JSON.parse(localStorage.getItem('PulsX_user') || '');
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('PulsX_token');
        localStorage.removeItem('PulsX_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('PulsX_token', mockToken);
      localStorage.setItem('PulsX_user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${userData.name}!`,
      });
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('PulsX_token', mockToken);
      localStorage.setItem('PulsX_user', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: 'Registration Successful',
        description: `Welcome to PulsX, ${name}!`,
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Unable to create account. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('PulsX_token');
    localStorage.removeItem('PulsX_user');
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
