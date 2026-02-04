import { assets } from '../assets/assets_frontend/assets.js';
import { NavLink, useNavigate } from 'react-router-dom';
import ToggleMode from './ToggleMode.jsx';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b ">
      <img
        className="w-44 cursor-pointer dark:invert"
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-gray-600 dark:bg-gray-400 hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-gray-600 dark:bg-gray-400 hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-gray-600 dark:bg-gray-400 hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-gray-600 dark:bg-gray-400 hidden" />
        </NavLink>
      </ul>
      <div>
        {token && (
          <div
            className="flex items-center gap-2 cursor-pointer relative "
            onClick={() => setOpen(!open)}
          >
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            {open && (
              <div className="absolute top-10 right-0 z-20 ">
                <div className="min-w-48 bg-slate-300 dark:bg-slate-800 p-2 rounded-md shadow-lg">
                  <p
                    onClick={() => {
                      setOpen(!open);
                      navigate('/my-profile');
                    }}
                    className="hover:text-blue-500"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      setOpen(!open);
                      navigate('/my-appointment');
                    }}
                    className="hover:text-blue-500"
                  >
                    My Appointment
                  </p>
                  <p
                    onClick={() => {
                      setOpen(!open);
                      setToken(false);
                    }}
                    className="hover:text-red-500"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        {!token && (
          <button
            onClick={() => {
              navigate('/login');
            }}
            className="px-4 py-1 border-2  rounded-md cursor-pointer  dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 "
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
