import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function IsAuthenticate() {
  const { token } = useAuth();

  if (token !== null) return <Navigate to="/" replace />; // or Loader

  return <Outlet />;
}

export default IsAuthenticate;
