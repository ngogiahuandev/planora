'use client';

import { ErrorScreen } from '@/components/layouts/error-screen';
import { authClient } from '@/lib/auth-client';

export const AlreadyAuthGuardProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = authClient.useSession();

  if (data?.user) {
    return <ErrorScreen code={403} message="You are already authenticated" />;
  }
  return <>{children}</>;
};
