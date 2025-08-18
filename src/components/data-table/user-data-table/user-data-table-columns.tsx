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
import { User } from '@/types/db';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const userDataTableColumns = (offset: number = 0): ColumnDef<User>[] => [
  {
    id: 'rowNumber',
    header: '#',
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm font-medium">{offset + row.index + 1}</div>
    ),
    size: 60,
  },
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   cell: ({ row }) => (
  //     <div className="text-muted-foreground font-mono text-xs">
  //       {row.getValue('id')?.toString().slice(0, 8)}...
  //     </div>
  //   ),
  // },
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
    accessorKey: 'banned',
    header: 'Status',
    cell: ({ row }) => {
      const isBanned = row.getValue('banned') as boolean;

      return (
        <div className="flex items-center space-x-2">
          {isBanned ? (
            <Badge variant="destructive">Banned</Badge>
          ) : (
            <Badge variant="default">Active</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'banReason',
    header: 'Ban Reason',
    cell: ({ row }) => {
      const banReason = row.getValue('banReason') as string;
      const isBanned = row.original.banned;

      return (
        <div className="max-w-[200px]">
          {isBanned && banReason ? (
            <span className="text-muted-foreground block truncate text-sm">{banReason}</span>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'banExpires',
    header: 'Ban Expires',
    cell: ({ row }) => {
      const banExpires = row.getValue('banExpires') as Date;
      const isBanned = row.original.banned;

      return (
        <div className="flex flex-col">
          {isBanned && banExpires ? (
            <span className="text-muted-foreground text-sm">
              {format(new Date(banExpires), 'h:mm a, MMMM dd, yyyy')}
            </span>
          ) : isBanned ? (
            <span className="text-muted-foreground text-sm">Permanent</span>
          ) : (
            <span className="text-muted-foreground text-sm">-</span>
          )}
        </div>
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
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
