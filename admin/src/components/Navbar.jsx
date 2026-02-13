import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b ">
      <div className="flex items-center gap-2 text-xs">
        <img
          onClick={() => navigate('/')}
          className="w-36 sm:w-40 cursor-pointer dark:invert"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full ">
          {user?.role === 'admin' ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className="  text-sm px-10 py-2 rounded-full bg-blue-400 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
