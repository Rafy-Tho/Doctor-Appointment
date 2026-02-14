import { assets } from '../../assets/assets';
import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import useCancelAppointment from '../../hooks/doctors/useCancelAppointment';
import useCompeteAppointment from '../../hooks/doctors/useCompeteAppointment';
import useGetDoctorDashboard from '../../hooks/doctors/useGetDoctorDashboard';
import { currencySymbol } from '../../utils/constant';
import { slotDateFormat } from '../../utils/helper';

function DoctorDashboard() {
  const { dashboardData, isLoadingDashboard, dashboardError } =
    useGetDoctorDashboard();
  const { completeAppointment, isCompleting, completeVariables } =
    useCompeteAppointment();
  const { cancelAppointment, isCancelling, cancelVariables } =
    useCancelAppointment();
  const { earningsData, appointmentCount, patientCount, latestAppointments } =
    dashboardData || {};
  if (isLoadingDashboard) {
    return <Loader />;
  }
  if (dashboardError) {
    return <ErrorMessage message={dashboardError.message} />;
  }
  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-slate-100 p-4 min-w-52 rounded border-2 border-slate-300 cursor-pointer hover:scale-105 transition-all dark:bg-slate-800 dark:border-slate-700">
          <img className="w-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
              {currencySymbol} {earningsData?.[0]?.totalEarnings || 0}
            </p>
            <p className="text-slate-400 dark:text-slate-500">Earnings</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-4 min-w-52 rounded border-2 border-slate-300 cursor-pointer hover:scale-105 transition-all dark:bg-slate-800 dark:border-slate-700">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {appointmentCount?.[0]?.totalAppointments || 0}
            </p>
            <p className="text-slate-400 dark:text-slate-500">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-4 min-w-52 rounded border-2 border-slate-300 cursor-pointer hover:scale-105 transition-all dark:bg-slate-800 dark:border-slate-700">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
              {patientCount?.[0]?.totalPatients || 0}
            </p>
            <p className="text-slate-400 dark:text-slate-500">Patients</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-slate-300 dark:bg-slate-800 dark:border-slate-700">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold text-slate-600 dark:text-slate-300">
            Latest Bookings
          </p>
        </div>

        <div className="pt-4 border border-t-0">
          {latestAppointments?.slice(0, 5).map((appointment, index) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800"
              key={index}
            >
              <img
                className="rounded-full w-10"
                src={appointment.userData?.image}
                alt=""
              />
              <div className="flex-1 text-sm">
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {appointment.userData?.name}
                </p>
                <p className="text-slate-400 dark:text-slate-500">
                  Booking on {slotDateFormat(appointment.slotDate)}
                </p>
              </div>
              {appointment.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex text-xs gap-3">
                  <button
                    onClick={() =>
                      cancelAppointment({ appointmentId: appointment._id })
                    }
                    className=" cursor-pointer text-red-400 font-medium bg-red-100 px-2 py-1 rounded"
                  >
                    {isCancelling &&
                    cancelVariables?.appointmentId === appointment._id
                      ? 'Cancelling...'
                      : 'Cancel'}
                  </button>
                  <button
                    onClick={() =>
                      completeAppointment({ appointmentId: appointment._id })
                    }
                    className=" cursor-pointer text-green-400 font-medium bg-green-100 px-2 py-1 rounded"
                  >
                    {isCompleting &&
                    completeVariables?.appointmentId === appointment._id
                      ? 'Completing...'
                      : 'Complete'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
