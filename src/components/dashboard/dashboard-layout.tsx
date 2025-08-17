'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { DashboardHeader } from './dashboard-header';
import { DashboardSidebar } from './dashboard-sidebar';
import { DashboardLayoutProps } from './types';

export function DashboardLayout({
  children,
  sidebarNavigation,
  breadcrumbItems = [],
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar navigation={sidebarNavigation} />
        <SidebarInset className="flex flex-col">
          <DashboardHeader breadcrumbItems={breadcrumbItems} />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
