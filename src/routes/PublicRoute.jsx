import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';
import { FullPageSpinner } from '../components/common/Spinner';

/**
 * Public Route Component
 * Redirects to dashboard if user is already authenticated
 * Used for login and register pages
 */
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <FullPageSpinner text="A carregar..." />;
  }

  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  // User is not authenticated, render children (login/register pages)
  return children;
};

export default PublicRoute;
