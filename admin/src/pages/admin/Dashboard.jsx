import { assets } from '../../assets/assets';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import useAdminCancelAppointment from '../../hooks/admin/useAdminCancelAppointment';
import useGetAdminDashboard from '../../hooks/admin/useGetAdminDashboard';
import { slotDateFormat } from '../../utils/helper';

function Dashboard() {
  const { dashboardStats, isPending, error } = useGetAdminDashboard();
  const { adminCancelAppointment, isCancellingAppointment, variables } =
    useAdminCancelAppointment();

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardStats?.totalDoctors || 0}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardStats?.totalAppointments || 0}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardStats?.totalPatients || 0}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-slate-600">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Bookings</p>
        </div>

        <div className="pt-4 border border-t-0">
          {dashboardStats?.latestAppointments
            ?.slice(0, 5)
            .map((appointment, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={appointment.doctorId.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {appointment.doctorId.name}
                  </p>
                  <p className="text-gray-600 ">
                    Booking on {slotDateFormat(appointment.slotDate)}
                  </p>
                </div>
                {appointment.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : appointment.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <button
                    onClick={() =>
                      adminCancelAppointment({ appointmentId: appointment._id })
                    }
                    className="px-4 py-1 bg-red-400 text-white text-xs font-medium rounded hover:bg-red-600 transition-all cursor-pointer"
                  >
                    {isCancellingAppointment && variables?.appointmentId === appointment._id ? 'Cancelling' : 'Cancel'}
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
