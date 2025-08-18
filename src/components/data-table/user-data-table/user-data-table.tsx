'use client';

import { DataTable } from '@/components/data-table/data-table';
import { userDataTableColumns } from '@/components/data-table/user-data-table/user-data-table-columns';
import { useQuery } from '@tanstack/react-query';

export const UserDataTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <DataTable columns={userDataTableColumns()} data={data} />
    </div>
  );
};
