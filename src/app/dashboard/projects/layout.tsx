import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Manage your projects, track progress, and organize tasks efficiently.',
  keywords: ['projects', 'project management', 'tasks', 'progress tracking', 'kanban'],
  openGraph: {
    title: 'Projects | Planora Dashboard',
    description: 'Manage your projects, track progress, and organize tasks efficiently.',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
