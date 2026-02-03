import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import ToggleMode from './components/ToggleMode';

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <ToggleMode />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:doctorId" element={<Appointment />} />
      </Routes>
    </div>
  );
}

export default App;
