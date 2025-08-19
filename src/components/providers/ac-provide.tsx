import { ErrorScreen } from '@/components/layouts/error-screen';
import { auth } from '@/lib/auth';
import { Permissions } from '@/lib/permissions';
import { headers } from 'next/headers';
import { ReactNode } from 'react';

interface AccessControlProviderProps {
  children: ReactNode;
  permissions?: Permissions;
}

export const AccessControlProvider = async ({
  children,
  permissions,
}: AccessControlProviderProps) => {
  if (!permissions || Object.keys(permissions).length === 0) {
    return children;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return <ErrorScreen code="401" message="Authentication required" />;
  }

  const canAccess = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions },
  });

  if (canAccess.error) {
    return <ErrorScreen code="403" message="You do not have access to this page" />;
  }

  return children;
};
