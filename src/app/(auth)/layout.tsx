import { Header } from '@/components/layouts/header';
import { AlreadyAuthGuardProvider } from '@/components/providers/already-auth-guard-provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth is a platform for creating and managing team projects',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AlreadyAuthGuardProvider>
      <Header />
      {children}
    </AlreadyAuthGuardProvider>
  );
}
