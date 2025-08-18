import { Metadata } from 'next';
import { AccessControlProvider } from '@/components/providers/ac-provide';

export const metadata: Metadata = {
  title: 'Projects | Dashboard | Planora',
  description: 'Manage your projects, tasks, and team collaboration in one place.',
};

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <AccessControlProvider roles="admin,regular" permissions="project">
      {children}
    </AccessControlProvider>
  );
}
