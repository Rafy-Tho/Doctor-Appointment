import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import ToggleMode from './ToggleMode';

function SidebarDoctor() {
  return (
    <ul className=" mt-5">
      <NavLink
        to={'/doctor-dashboard'}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? ' border-r-4 dark:bg-slate-800 bg-slate-300' : ''}`
        }
      >
        <img className="min-w-5 dark:invert" src={assets.home_icon} alt="" />
        <p className="hidden md:block">Dashboard</p>
      </NavLink>
      <NavLink
        to={'/doctor-appointments'}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? ' border-r-4 dark:bg-slate-800 bg-slate-300' : ''}`
        }
      >
        <img
          className="min-w-5 dark:invert"
          src={assets.appointment_icon}
          alt=""
        />
        <p className="hidden md:block">Appointments</p>
      </NavLink>
      <NavLink
        to={'/doctor-profile'}
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? ' border-r-4 dark:bg-slate-800 bg-slate-300' : ''}`
        }
      >
        <img className="min-w-5 dark:invert" src={assets.people_icon} alt="" />
        <p className="hidden md:block">Profile</p>
      </NavLink>
      <li
        className={`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 `}
      >
        <ToggleMode /> <p className="hidden md:block">Theme</p>
      </li>
    </ul>
  );
}

export default SidebarDoctor;
