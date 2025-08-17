import { createAuthClient } from 'better-auth/react';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { auth } from '@/lib/auth';
import { adminClient } from 'better-auth/client/plugins';
import { ac, admin, regular } from './permissions';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      ac,
      roles: {
        admin,
        regular,
      },
    }),
  ],
});
