import { user } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof user>;
export type Sesssion = InferSelectModel<typeof session>;
export type account = InferSelectModel<typeof account>;
