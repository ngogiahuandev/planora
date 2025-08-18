import { Metadata } from 'next';
import { AccessControlProvider } from '@/components/providers/ac-provide';

export const metadata: Metadata = {
  title: 'Dashboard | Planora',
  description: 'Task and team management dashboard for organizing projects and tracking progress.',
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AccessControlProvider roles="admin,regular" permissions="project">
      {children}
    </AccessControlProvider>
  );
}
