import { ToastContainer } from 'react-toastify';
import useTheme from '../hooks/useTheme';
import Navbar from './Navbar';
import ToggleMode from './ToggleMode';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
function AppLayout() {
  const { theme } = useTheme();
  return (
    <div className="mx-4 sm:mx-[5%] md:mx-[7%] lg:mx-[10%]">
      <Navbar />
      <ToggleMode />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={theme}
      />
    </div>
  );
}

export default AppLayout;
