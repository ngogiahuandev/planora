'use client';

import { ErrorScreen } from '@/components/layouts/error-screen';
import { LoadingScreen } from '@/components/layouts/loading-screen';
import { authClient } from '@/lib/auth-client';

interface RefreshUserProviderProps {
  children: React.ReactNode;
}

export default function RefreshUserProvider({ children }: RefreshUserProviderProps) {
  const { isPending, error } = authClient.useSession();

  if (isPending) {
    return <LoadingScreen message="Loading user..." />;
  }

  if (error) {
    return <ErrorScreen code={error.status} message={error.message} />;
  }

  return children;
}
