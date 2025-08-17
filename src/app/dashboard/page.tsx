'use client';

import {
  DashboardLayout,
  defaultSidebarNavigation,
  type BreadcrumbItem,
} from '@/components/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, CreditCard, MessageSquare, Calendar, Bell } from 'lucide-react';

// Define breadcrumb items for dashboard page
const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout sidebarNavigation={defaultSidebarNavigation} breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here's an overview of your workspace.
          </p>
        </div>

        {/* Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,651</div>
              <p className="text-muted-foreground text-xs">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-muted-foreground text-xs">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <CreditCard className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,563</div>
              <p className="text-muted-foreground text-xs">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-muted-foreground text-xs">+3 unread</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-muted-foreground text-xs">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Project completed</p>
                    <p className="text-muted-foreground text-xs">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-muted-foreground text-xs">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm transition-colors">
                  <FileText className="h-4 w-4" />
                  <span>Create new project</span>
                </button>
                <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Invite team member</span>
                </button>
                <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule meeting</span>
                </button>
                <button className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-start space-x-2 rounded-md p-2 text-sm transition-colors">
                  <Bell className="h-4 w-4" />
                  <span>View notifications</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
