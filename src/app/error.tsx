'use client';

import { ErrorScreen } from '@/components/layouts/error-screen';

export default function Error() {
  return <ErrorScreen code="500" message="Internal server error" />;
}
