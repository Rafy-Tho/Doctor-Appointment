import useAuth from '../hooks/useAuth';
import SidebarAdmin from './SidebarAdmin';
import SidebarDoctor from './SidebarDoctor';

function Sidebar() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen  border-r">
      {user?.role === 'admin' && <SidebarAdmin />}
      {user?.role === 'doctor' && <SidebarDoctor />}
    </div>
  );
}

export default Sidebar;
