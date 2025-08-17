import { AdminGuardProvider } from '@/components/providers/admin-guard-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuardProvider>
      <div className="h-[calc(100vh-4rem)]">{children}</div>
    </AdminGuardProvider>
  );
}
