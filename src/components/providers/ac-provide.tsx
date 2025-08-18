'use client';

import { ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { checkPermission } from '@/lib/dashboard-navigation';
import { ErrorScreen } from '@/components/layouts/error-screen';

interface AccessControlProviderProps {
  children: ReactNode;
  roles: string;
  permissions: string;
}

export const AccessControlProvider = ({ children, permissions }: AccessControlProviderProps) => {
  const { data: session } = authClient.useSession();

  if (!session) {
    return redirect('/login');
  }

  const hasAccess = checkPermission(session.user.role ?? '', permissions);

  if (!hasAccess) {
    return <ErrorScreen code="403" message="You do not have access to this page" />;
  }

  return children;
};
