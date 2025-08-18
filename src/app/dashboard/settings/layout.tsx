import { Metadata } from 'next';
import { RoleProvider } from '@/components/providers/role-provider';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Configure your account settings, preferences, and system configurations.',
  keywords: ['settings', 'configuration', 'preferences', 'account', 'admin'],
  openGraph: {
    title: 'Settings | Planora Dashboard',
    description: 'Configure your account settings, preferences, and system configurations.',
  },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  // Settings page requires admin role
  return <RoleProvider requiredRole="admin">{children}</RoleProvider>;
}
