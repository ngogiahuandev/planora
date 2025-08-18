import { db } from '@/db/drizzle';
import { auth } from '@/lib/auth';
import { toPositiveInt } from '@/lib/number';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const canReadUsers = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        user: ['list'],
      },
    },
  });

  if (canReadUsers.error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const qRaw = searchParams.get('q');
  const q = qRaw?.trim() || undefined;
  const limit = toPositiveInt(searchParams.get('limit'), 10);
  const offset = toPositiveInt(searchParams.get('offset'), 0);

  console.log(searchParams.get('limit'));

  const users = await db.query.user.findMany({
    where: q
      ? (user, { or, ilike }) =>
          or(
            ilike(user.name, `%${q}%`),
            ilike(user.email, `%${q}%`),
            ilike(user.id, `%${q}%`),
            ilike(user.slug, `%${q}%`),
          )
      : undefined,
    limit,
    offset,
  });
  return NextResponse.json(users);
}
