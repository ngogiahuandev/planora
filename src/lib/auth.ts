import { db } from '@/db/drizzle';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin } from 'better-auth/plugins';

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
    admin({
      defaultRole: 'regular',
      adminRoles: ['admin'],
      defaultBanReason: 'Banned by admin',
    }),
  ],
});
