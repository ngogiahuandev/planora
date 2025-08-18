import { Metadata } from 'next';
import { AccessControlProvider } from '@/components/providers/ac-provide';

export const metadata: Metadata = {
  title: 'Analytics | Dashboard | Planora',
  description: 'View detailed analytics and insights for your projects and team performance.',
};

interface AnalyticsLayoutProps {
  children: React.ReactNode;
}

export default function AnalyticsLayout({ children }: AnalyticsLayoutProps) {
  return (
    <AccessControlProvider roles="admin,regular" permissions="analytics">
      {children}
    </AccessControlProvider>
  );
}
