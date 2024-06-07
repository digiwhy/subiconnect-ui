import { useAuthenticationContext } from 'context/authentication';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuthenticationContext();

  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2">
        <LoaderCircle className="h-4 w-4 animate-spin" /> Loading
      </div>
    );
  }

  if (!isLoading && !isLoggedIn) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2">
        Please login to the{' '}
        <Link href={process.env.NEXT_DEVELOPER_PORTAL_URL as string}>
          dev portal
        </Link>
        .
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
