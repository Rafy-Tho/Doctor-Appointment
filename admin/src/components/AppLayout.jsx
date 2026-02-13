import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import useAuth from '../hooks/useAuth';

function AppLayout() {
  const { token } = useAuth();
  return (
    <div className="">
      <ToastContainer />
      {token && <Navbar />}
      <div className="flex w-full">
        {token && <Sidebar />}
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
