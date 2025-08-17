'use client';

import { Header } from '@/components/layouts/header';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
}
