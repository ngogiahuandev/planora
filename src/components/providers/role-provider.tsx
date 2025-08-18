'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getSidebarNavigationWithPermissions } from '@/components/dashboard/navigation';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface RoleContextType {
  role: string;
  hasPermission: (permission: string) => boolean;
  sidebarNavigation: any[];
  user: any;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

interface RoleProviderProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
  allowedRoles?: string[];
}

export function RoleProvider({
  children,
  requiredRole,
  redirectTo = '/auth/signin',
  allowedRoles = ['admin', 'regular'],
}: RoleProviderProps) {
  const { data: session } = authClient.useSession();

  const hasPermission = (permission: string): boolean => {
    if (!session?.user) return false;

    if (session.user.role === 'admin') return true;
    const basicPermissions = ['read', 'create'];
    return basicPermissions.includes(permission);
  };

  const sidebarNavigation = session?.user?.role
    ? getSidebarNavigationWithPermissions(session.user.role)
    : [];

  if (!session?.user) {
    return null;
  }

  const value: RoleContextType = {
    role: session.user.role || 'regular',
    hasPermission,
    sidebarNavigation,
    user: session.user,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

export function withRoleProtection<T extends object>(
  Component: React.ComponentType<T>,
  options: {
    requiredRole?: string;
    allowedRoles?: string[];
    redirectTo?: string;
  } = {},
) {
  return function ProtectedComponent(props: T) {
    return (
      <RoleProvider {...options}>
        <Component {...props} />
      </RoleProvider>
    );
  };
}
