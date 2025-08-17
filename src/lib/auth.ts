import { db } from '@/db/drizzle';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin as adminPlugin } from 'better-auth/plugins';
import { ac, admin, regular } from './permissions';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      slug: {
        type: 'string',
        required: true,
        unique: true,
        input: true,
      },
    },
  },
  plugins: [
    adminPlugin({
      defaultRole: 'regular',
      adminRoles: ['admin'],
      defaultBanReason: 'Banned by admin',
      ac,
      roles: {
        admin,
        regular,
      },
    }),
  ],
});
