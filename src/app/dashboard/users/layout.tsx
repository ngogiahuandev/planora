import { Metadata } from 'next';
import { RoleProvider } from '@/components/providers/role-provider';

export const metadata: Metadata = {
  title: 'Users',
  description: 'Manage team members, user roles, and access permissions.',
  keywords: ['users', 'team management', 'roles', 'permissions', 'admin'],
  openGraph: {
    title: 'Users | Planora Dashboard',
    description: 'Manage team members, user roles, and access permissions.',
  },
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  // Users page requires admin role or special permissions
  return <RoleProvider allowedRoles={['admin']}>{children}</RoleProvider>;
}
