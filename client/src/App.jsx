import { Route, Routes } from 'react-router-dom';

import ProtectRoute from './components/ProtectRoute';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Doctors from './pages/Doctors';
import Home from './pages/Home';
import Login from './pages/Login';
import MyAppointment from './pages/MyAppointment';
import MyProfile from './pages/MyProfile';
import Signup from './pages/Signup';
import UpdateProfile from './pages/UpdateProfile';
import Verify from './pages/Verify';
import AppLayout from './components/AppLayout';
import IsAuthenticate from './components/IsAuthenticate';
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route element={<IsAuthenticate />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
        <Route element={<ProtectRoute />}>
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-profile/edit" element={<UpdateProfile />} />
          <Route path="/appointment/:doctorId" element={<Appointment />} />
          <Route path="/verify" element={<Verify />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
