import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ allowedRoles }) {
  const { user, token } = useAuth();

  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
