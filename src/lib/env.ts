import { z } from 'zod';

const envSchema = z
  .object({
    DATABASE_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
  })
  .required();

export const env = envSchema.parse(process.env);
