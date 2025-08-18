'use client';

import { DashboardLayout, type BreadcrumbItem } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRole } from '@/components/providers/role-provider';

// Define breadcrumb items with more than 5 items to test the ellipsis functionality
const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Management',
    href: '/dashboard/management',
  },
  {
    title: 'Workspace',
    href: '/dashboard/workspace',
  },
  {
    title: 'Team',
    href: '/dashboard/team',
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
  },
];

export default function ProjectsPage() {
  const { sidebarNavigation } = useRole();

  return (
    <DashboardLayout sidebarNavigation={sidebarNavigation} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and track their progress. This page demonstrates the breadcrumb
            ellipsis feature.
          </p>
        </div>

        {/* Projects Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Website Redesign</CardTitle>
              <CardDescription>Complete overhaul of company website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="bg-secondary h-2 w-full rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile App</CardTitle>
              <CardDescription>iOS and Android application development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <div className="bg-secondary h-2 w-full rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Integration</CardTitle>
              <CardDescription>Third-party service integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>90%</span>
                </div>
                <div className="bg-secondary h-2 w-full rounded-full">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breadcrumb Information */}
        <Card>
          <CardHeader>
            <CardTitle>Breadcrumb Feature Demo</CardTitle>
            <CardDescription>
              This page demonstrates the breadcrumb ellipsis functionality with more than 5 items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Current breadcrumb path:</h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Home → Dashboard → Management → Workspace → Team → Projects
                </p>
              </div>
              <div>
                <h4 className="font-medium">Displayed as:</h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  Home → ⋯ (dropdown with: Dashboard, Management, Workspace) → Team → Projects
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                The middle items (Dashboard, Management, Workspace) are collapsed into a dropdown
                menu accessible via the ellipsis button.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
