'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardHeader } from './dashboard-header';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardLayoutProps } from './types';
import { getSidebarNavigationWithPermissions } from '@/lib/dashboard-navigation';
import { authClient } from '@/lib/auth-client';

export function DashboardLayout({ children, breadcrumbItems = [] }: DashboardLayoutProps) {
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role ?? 'regular';
  const sidebarNavigation = getSidebarNavigationWithPermissions(userRole);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar navigation={sidebarNavigation} />
        <SidebarInset className="flex flex-col">
          <DashboardHeader breadcrumbItems={breadcrumbItems} />
          <main className="flex-1 overflow-auto p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
