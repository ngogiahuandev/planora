import { ErrorScreen } from '@/components/layouts/error-screen';
import { auth } from '@/lib/auth';
import { checkPermission } from '@/lib/dashboard-navigation';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface AccessControlProviderProps {
  children: ReactNode;
  roles: string;
  permissions: string;
}

export const AccessControlProvider = async ({
  children,
  permissions,
}: AccessControlProviderProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const hasAccess = checkPermission(session?.user?.role ?? '', permissions);

  if (!hasAccess) {
    return <ErrorScreen code="403" message="You do not have access to this page" />;
  }

  return children;
};
