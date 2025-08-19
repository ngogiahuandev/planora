import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

const statement = {
  ...defaultStatements,
  project: ['create', 'read', 'update', 'delete', 'can-access'],
  messages: ['read', 'create', 'update', 'delete', 'can-access'],
  calendar: ['read', 'create', 'update', 'delete', 'can-access'],
  notifications: ['read', 'update', 'can-access'],
  integrations: ['read', 'update', 'can-access'],
  settings: ['read', 'update', 'can-access'],
  analytics: ['read', 'can-access'],
  billing: ['read', 'update', 'can-access'],
} as const;

export type PermissionStatement = typeof statement;

export type Permissions = Partial<{
  [K in keyof PermissionStatement]: PermissionStatement[K][number][];
}>;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  project: ['create', 'update', 'delete', 'read', 'can-access'],
  messages: ['read', 'create', 'update', 'delete', 'can-access'],
  calendar: ['read', 'create', 'update', 'delete', 'can-access'],
  notifications: ['read', 'update', 'can-access'],
  integrations: ['read', 'update', 'can-access'],
  settings: ['read', 'update', 'can-access'],
  analytics: ['read', 'can-access'],
  billing: ['read', 'update', 'can-access'],
  ...adminAc.statements,
});

export const regular = ac.newRole({
  project: ['read', 'create', 'update', 'delete', 'can-access'],
  messages: ['read', 'create', 'update', 'delete', 'can-access'],
  calendar: ['read', 'create', 'update', 'delete', 'can-access'],
  notifications: ['read', 'update', 'can-access'],
  integrations: ['read', 'update', 'can-access'],
  settings: ['read', 'update', 'can-access'],
  analytics: ['read', 'can-access'],
  billing: ['read', 'update', 'can-access'],
});
