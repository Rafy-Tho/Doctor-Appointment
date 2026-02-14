import { Navigate, Route, Routes } from 'react-router-dom';
import AddDoctor from './pages/admin/AddDoctor';
import AllAppointments from './pages/admin/AllAppointments';
import Dashboard from './pages/admin/Dashboard';
import DoctorsList from './pages/admin/DoctorsList';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorProfile from './pages/doctor/DoctorProfile';
import NotFoundPage from './components/NotFoundPage';
import AppLayout from './components/AppLayout';
import IsAuthenticate from './components/IsAuthenticate';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RootRedirect from './components/RootDirect';
import LoginForm from './pages/LoginForm';
import AdminLogin from './pages/AdminLogin';
import DoctorLogin from './pages/DoctorLogin';
import DoctorUpdateProfile from './pages/doctor/DoctorUpdateProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Default Route */}
        <Route index element={<RootRedirect />} />

        {/* Login - Only if NOT logged in */}
        <Route element={<IsAuthenticate />}>
          <Route path="login" element={<Login />}>
            <Route index element={<Navigate to="admin" replace />} />
            <Route path="admin" element={<AdminLogin />} />
            <Route path="doctor" element={<DoctorLogin />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin-dashboard" element={<Dashboard />} />
          <Route path="all-appointments" element={<AllAppointments />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="doctor-list" element={<DoctorsList />} />
        </Route>

        {/* Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="doctor-appointments" element={<DoctorAppointments />} />
          <Route path="doctor-profile" element={<DoctorProfile />} />
          <Route
            path="doctor-update-profile"
            element={<DoctorUpdateProfile />}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
