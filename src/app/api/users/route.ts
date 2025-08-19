import { db } from '@/db/drizzle';
import { user as userTable } from '@/db/schema';
import { auth } from '@/lib/auth';
import { toPositiveInt } from '@/lib/number';
import { SortableFields, SortOrder } from '@/types/users';
import { ilike, or, count, ne, and } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import { desc, asc } from 'drizzle-orm';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const canReadUsers = await auth.api.userHasPermission({
    body: { userId: session.user.id, permissions: { user: ['list'] } },
  });
  if (canReadUsers.error) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const q = searchParams.get('q')?.trim() || undefined;
  const limit = toPositiveInt(searchParams.get('limit'), 10);
  const offset = toPositiveInt(searchParams.get('offset'), 0);
  const sortBy = (searchParams.get('sortBy') as SortableFields) ?? 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? 'desc';

  const excludeCurrentUser = ne(userTable.id, session.user.id);

  const searchFilter = q
    ? or(
        ilike(userTable.name, `%${q}%`),
        ilike(userTable.email, `%${q}%`),
        ilike(userTable.id, `%${q}%`),
        ilike(userTable.slug, `%${q}%`),
      )
    : undefined;

  const filter = searchFilter ? and(excludeCurrentUser, searchFilter) : excludeCurrentUser;
  const orderByClause = sortOrder === 'desc' ? desc(userTable[sortBy]) : asc(userTable[sortBy]);

  const [users, totalRow] = await Promise.all([
    db.query.user.findMany({
      where: filter,
      limit,
      offset,
      orderBy: orderByClause,
    }),
    db.select({ total: count() }).from(userTable).where(filter),
  ]);

  const total = totalRow[0]?.total ?? 0;

  return NextResponse.json({
    users,
    metadata: { total, offset, limit },
  });
}
