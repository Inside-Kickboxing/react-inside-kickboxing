import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const { authUser } = useAuth();

  if (!authUser) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
