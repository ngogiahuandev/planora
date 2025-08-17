'use client';

import { LoadingScreen } from '@/components/layouts/loading-screen';
import { authClient } from '@/lib/auth-client';

interface RefreshUserProviderProps {
  children: React.ReactNode;
}

export default function RefreshUserProvider({ children }: RefreshUserProviderProps) {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return <LoadingScreen message="Loading user..." />;
  }

  return children;
}
