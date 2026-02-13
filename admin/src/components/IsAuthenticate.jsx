import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function IsAuthenticate() {
  const { token, user } = useAuth();

  if (user !== null && token !== null) {
    // Optional: redirect based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (user.role === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    }
  }

  return <Outlet />;
}

export default IsAuthenticate;
