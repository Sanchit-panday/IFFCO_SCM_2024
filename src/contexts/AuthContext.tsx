import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import type { User, AuthContextType, UserRole } from '@/types/auth';

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@iffco.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    avatar: '/assets/avatars/admin.png'
  },
  {
    id: '2',
    name: 'Production Manager',
    email: 'production@iffco.com',
    password: 'prod123',
    role: 'production' as UserRole,
    location: 'Aonla Unit',
    avatar: '/assets/avatars/production.png'
  },
  {
    id: '3',
    name: 'Distribution Manager',
    email: 'distribution@iffco.com',
    password: 'dist123',
    role: 'distribution' as UserRole,
    location: 'Delhi Hub',
    avatar: '/assets/avatars/distribution.png'
  },
  {
    id: '4',
    name: 'Retailer Partner',
    email: 'retailer@iffco.com',
    password: 'retail123',
    role: 'retailer' as UserRole,
    location: 'Lucknow',
    avatar: '/assets/avatars/retailer.png'
  },
  {
    id: '5',
    name: 'Logistics Coordinator',
    email: 'logistics@iffco.com',
    password: 'log123',
    role: 'logistics' as UserRole,
    avatar: '/assets/avatars/logistics.png'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('iffco_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('iffco_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        
        if (!foundUser) {
          setError('Invalid email or password');
          setIsLoading(false);
          toast.error('Invalid email or password');
          return;
        }
        
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('iffco_user', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        toast.success(`Welcome back, ${userWithoutPassword.name}`);
      }, 1000); // Simulate API delay
    } catch (e) {
      setError('An error occurred during login');
      setIsLoading(false);
      toast.error('Login failed. Please try again.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iffco_user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};