'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatSlug } from '@/lib/slug';
import { User } from '@/db/db';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChangeUserRole } from '@/components/data-table/user-data-table/change-user-role';
import { SetUserPassword } from '@/components/data-table/user-data-table/set-user-password';
import { BanUser } from '@/components/data-table/user-data-table/ban-user';
import { UnbanUser } from '@/components/data-table/user-data-table/unban-user';

export const userDataTableColumns = (offset: number = 0): ColumnDef<User>[] => [
  {
    id: 'rowNumber',
    header: '#',
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm font-medium">{offset + row.index + 1}</div>
    ),
    size: 60,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
          <AvatarFallback className="text-xs">
            {user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="">{row.getValue('name')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span className="">{row.getValue('email')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ row }) => <Badge variant="secondary">{formatSlug(row.getValue('slug'))}</Badge>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      const roleVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        admin: 'destructive',
        user: 'secondary',
        moderator: 'default',
      };

      return (
        <Badge variant={roleVariants[role] || 'outline'} className="capitalize">
          {role || 'user'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'Verification',
    cell: ({ row }) => {
      const isVerified = row.getValue('emailVerified');

      return (
        <div className="flex items-center space-x-2">
          {isVerified ? (
            <Badge variant="default">Verified</Badge>
          ) : (
            <Badge variant="outline">Pending</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'banned',
    header: 'Banned',
    cell: ({ row }) => {
      const banned = row.getValue('banned');
      return <Badge variant={banned ? 'destructive' : 'outline'}>{banned ? 'Yes' : 'No'}</Badge>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date;
      return (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">
            {format(new Date(date), 'P, h:mm a')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const date = row.getValue('updatedAt') as Date;
      return (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">
            {format(new Date(date), 'P, h:mm a')}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>⋯
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <ChangeUserRole user={user} />
            <SetUserPassword user={user} />
            <UnbanUser user={user} />
            <DropdownMenuSeparator />
            <BanUser user={user} />
            <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
