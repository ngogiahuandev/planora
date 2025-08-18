import {
  DashboardLayout,
  defaultSidebarNavigation,
  type BreadcrumbItem,
} from '@/components/dashboard';
import { DashboardTitle } from '@/components/dashboard/dashbaord-title';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Users',
  },
];

export default function UsersPage() {
  return (
    <DashboardLayout breadcrumbItems={breadcrumbItems}>
      <div className="space-y-6">
        <DashboardTitle
          title="Users"
          description="Manage your workspace users and their permissions."
        />

        <div className="flex items-center space-x-2">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input placeholder="Search users..." className="pl-8" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
