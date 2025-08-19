import { Metadata } from 'next';
import { AccessControlProvider } from '@/components/providers/ac-provide';

export const metadata: Metadata = {
  title: 'Users | Dashboard | Planora',
  description: 'Manage team members, roles, and permissions for your organization.',
};

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return <AccessControlProvider permissions={{ user: ['list'] }}>{children}</AccessControlProvider>;
}
