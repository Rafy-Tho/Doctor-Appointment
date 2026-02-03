import { assets } from '../assets/assets_frontend/assets.js';
import { NavLink } from 'react-router-dom';
import ToggleMode from './ToggleMode.jsx';

function Navbar() {
  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300">
      <img
        className="w-44 cursor-pointer dark:invert"
        src={assets.logo}
        alt="logo"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none" />
        </NavLink>
      </ul>
      <div>
        <button className="px-4 py-1 border border-gray-300 rounded-md">
          Create account
        </button>
      </div>
    </div>
  );
}

export default Navbar;
