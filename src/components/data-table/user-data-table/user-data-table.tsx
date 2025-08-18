'use client';

import { db } from '@/db/drizzle';

interface UserDataTableProps {}

export const UserDataTable = () => {
  const users = db.query.user.findMany();
  console.log(users);
  return <div>UserDataTable</div>;
};
