import { assets } from '../assets/assets_frontend/assets.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto py-4">
        {/* LOGO */}
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate('/')}
          className="w-36 cursor-pointer dark:invert"
        />

        {/* RIGHT SIDE */}
        <div className="flex items-center md:order-2 gap-3 relative">
          {/* PROFILE / LOGIN */}
          {token ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <img className="w-8 rounded-full" src={assets.profile_pic} />
              <img className="w-2.5" src={assets.dropdown_icon} />

              {openProfile && (
                <div className="absolute top-12 right-0 min-w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-2">
                  <p
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded cursor-pointer"
                    onClick={() => {
                      setOpenProfile(false);
                      navigate('/my-profile');
                    }}
                  >
                    My Profile
                  </p>
                  <p
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded cursor-pointer"
                    onClick={() => {
                      setOpenProfile(false);
                      navigate('/my-appointment');
                    }}
                  >
                    My Appointment
                  </p>
                  <p
                    className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded cursor-pointer"
                    onClick={() => {
                      setOpenProfile(false);
                      setToken(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Get Started
            </button>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpenMobile(!openMobile)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* NAV LINKS */}
        <div
          className={`w-full md:flex md:w-auto md:order-1 ${
            openMobile ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 mt-4 md:mt-0 font-medium bg-gray-50 dark:bg-slate-800 md:bg-transparent p-4 md:p-0 rounded-lg">
            {['/', '/doctors', '/about', '/contact'].map((path, i) => (
              <NavLink
                key={i}
                to={path}
                onClick={() => {
                  setOpenMobile(false);
                  scrollTo(0, 0);
                }}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600'
                  }`
                }
              >
                {path === '/'
                  ? 'Home'
                  : path.replace('/', '').replace('-', ' ')}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
