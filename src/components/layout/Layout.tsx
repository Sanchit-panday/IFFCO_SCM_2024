import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { SidebarProvider } from '@/contexts/SidebarContext';

interface LayoutProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'production' | 'distribution' | 'retailer' | 'logistics' | 'any';
}

export const Layout: React.FC<LayoutProps> = ({ children, requiredRole = 'any' }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole !== 'any' && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};