import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics',
  description: 'View detailed analytics and insights for your projects and team performance.',
  keywords: ['analytics', 'insights', 'metrics', 'performance', 'dashboard'],
  openGraph: {
    title: 'Analytics | Planora Dashboard',
    description: 'View detailed analytics and insights for your projects and team performance.',
  },
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
