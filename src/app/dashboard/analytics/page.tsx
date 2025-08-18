'use client';

import { DashboardLayout, type BreadcrumbItem } from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRole } from '@/components/providers/role-provider';

// Define breadcrumb items for analytics page
const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Analytics',
  },
];

export default function AnalyticsPage() {
  const { sidebarNavigation } = useRole();

  return (
    <DashboardLayout sidebarNavigation={sidebarNavigation} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights and metrics for your workspace.</p>
        </div>

        {/* Analytics Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
              <CardDescription>Total page views this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-muted-foreground text-xs">+20% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Sessions</CardTitle>
              <CardDescription>Active user sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-muted-foreground text-xs">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Visitor to customer conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.24%</div>
              <p className="text-muted-foreground text-xs">+0.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Website traffic over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted flex h-[300px] w-full items-center justify-center rounded-md">
              <p className="text-muted-foreground">Chart Component Would Go Here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
