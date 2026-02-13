import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RootRedirect() {
  const { token, user } = useAuth();
  if (token !== null) {
    if (user.role === 'admin')
      return <Navigate to="/admin-dashboard" replace />;

    if (user.role === 'doctor')
      return <Navigate to="/doctor-dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}
