import { Outlet } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen  flex items-center justify-center w-full">
      <Outlet />
    </div>
  );
}

export default Login;
