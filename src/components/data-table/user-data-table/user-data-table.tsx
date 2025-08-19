'use client';

import { DataTable } from '@/components/data-table/data-table';
import { userDataTableColumns } from '@/components/data-table/user-data-table/user-data-table-columns';
import { CreateManyUsersButton } from '@/components/data-table/user-data-table/create-many-users-button';
import { UserDataTablePaging } from '@/components/data-table/user-data-table/user-data-table-paging';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { GetAllUsersResponse } from '@/types/users';
import { UserDataTableSearch } from '@/components/data-table/user-data-table/user-data-table-search';
import { UserDataTableSorting } from '@/components/data-table/user-data-table/user-data-table-sorting';

export const UserDataTable = () => {
  const searchParams = useSearchParams();

  const limit = parseInt(searchParams.get('limit') ?? '10');
  const offset = parseInt(searchParams.get('offset') ?? '0');
  const q = searchParams.get('q') ?? '';
  const sortBy = searchParams.get('sortBy') ?? 'createdAt';
  const sortOrder = searchParams.get('sortOrder') ?? 'desc';

  const queryParams = new URLSearchParams();
  if (limit !== 10) queryParams.set('limit', limit.toString());
  if (offset !== 0) queryParams.set('offset', offset.toString());
  if (q) queryParams.set('q', q);
  if (sortBy !== 'createdAt') queryParams.set('sortBy', sortBy);
  if (sortOrder !== 'desc') queryParams.set('sortOrder', sortOrder);

  const queryString = queryParams.toString();
  const apiUrl = `/api/users${queryString ? `?${queryString}` : ''}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', limit, offset, q, sortBy, sortOrder],
    queryFn: () => fetch(apiUrl).then((res) => res.json()) as Promise<GetAllUsersResponse>,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserDataTableSearch />
          <UserDataTableSorting />
        </div>
        <CreateManyUsersButton />
      </div>
      <DataTable
        columns={userDataTableColumns(offset)}
        data={data?.users ?? []}
        loading={isLoading}
      />
      <div className="mt-2">
        {data?.metadata && (
          <UserDataTablePaging
            total={data.metadata.total}
            limit={data.metadata.limit}
            offset={data.metadata.offset}
          />
        )}
      </div>
    </div>
  );
};
