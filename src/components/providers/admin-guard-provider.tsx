'use client';

import { ErrorScreen } from '@/components/layouts/error-screen';
import { authClient } from '@/lib/auth-client';

interface AdminGuardProviderProps {
  children: React.ReactNode;
}

export const AdminGuardProvider = ({ children }: AdminGuardProviderProps) => {
  const { data: session } = authClient.useSession();

  if (session?.user.role !== 'admin') {
    return <ErrorScreen code="403" message="You are not authorized to access this page" />;
  }

  return children;
};
