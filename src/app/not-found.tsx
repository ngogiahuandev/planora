import { ErrorScreen } from '@/components/layouts/error-screen';

export default function NotFound() {
  return <ErrorScreen code="404" message="Page not found" />;
}
