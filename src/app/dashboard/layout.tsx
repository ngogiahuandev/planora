import { Metadata } from 'next';
import { RoleProvider } from '@/components/providers/role-provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Planora Dashboard',
    default: 'Dashboard | Planora',
  },
  description: 'Planora dashboard - Manage your tasks, projects, and team collaboration.',
  keywords: ['dashboard', 'project management', 'task management', 'team collaboration'],
  authors: [{ name: 'Planora Team' }],
  openGraph: {
    title: 'Planora Dashboard',
    description: 'Manage your tasks, projects, and team collaboration with Planora.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planora Dashboard',
    description: 'Manage your tasks, projects, and team collaboration with Planora.',
  },
  robots: {
    index: false, // Dashboard pages should not be indexed
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <RoleProvider allowedRoles={['admin', 'regular']}>{children}</RoleProvider>;
}
