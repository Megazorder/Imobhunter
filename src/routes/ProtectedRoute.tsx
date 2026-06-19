import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute() {
  const { session, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading)
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
