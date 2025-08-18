import { User } from '@/db/db';

export type GetAllUsersResponse = {
  users: User[];
  metadata: {
    total: number;
    offset: number;
    limit: number;
  };
};
