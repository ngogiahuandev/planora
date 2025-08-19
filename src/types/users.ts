import { User } from '@/db/db';

export type GetAllUsersResponse = {
  users: User[];
  metadata: {
    total: number;
    offset: number;
    limit: number;
  };
};

export type SortableFields = 'name' | 'email' | 'createdAt' | 'updatedAt' | 'role';
export type SortOrder = 'asc' | 'desc';

export enum UserRole {
  ADMIN = 'admin',
  REGULAR = 'regular',
}
