import { Metadata } from 'next';
import { AccessControlProvider } from '@/components/providers/ac-provide';

export const metadata: Metadata = {
  title: 'Settings | Dashboard | Planora',
  description: 'Configure your account settings, preferences, and application settings.',
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <AccessControlProvider roles="admin" permissions="settings">
      {children}
    </AccessControlProvider>
  );
}
