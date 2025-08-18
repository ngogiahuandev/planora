import { DashboardLayout, type BreadcrumbItem } from '@/components/dashboard';
import { DashboardTitle } from '@/components/dashboard/dashbaord-title';
import { UserDataTable } from '@/components/data-table/user-data-table/user-data-table';

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
        <UserDataTable />
      </div>
    </DashboardLayout>
  );
}
