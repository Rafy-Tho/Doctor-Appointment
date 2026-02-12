import useAuth from '../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectRoute() {
  const { token } = useAuth();

  if (token === null) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectRoute;
