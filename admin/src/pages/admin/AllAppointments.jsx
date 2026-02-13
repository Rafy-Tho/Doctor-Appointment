import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import useAdminCancelAppointment from '../../hooks/admin/useAdminCanceAppointment';
import useAdminGetAppointment from '../../hooks/admin/useAdminGetAppointment';
import { currencySymbol } from '../../utils/constant';
import { calculateAge, slotDateFormat } from '../../utils/helper';
const currency = currencySymbol;
function AllAppointments() {
  const { appointments, isPending, error } = useAdminGetAppointment();
  const { adminCancelAppointment, isCancellingAppointment } =
    useAdminCancelAppointment();
  if (isPending) {
    return <Loader />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }
  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((appointment, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={appointment.userId.image}
                className="w-8 rounded-full"
                alt=""
              />{' '}
              <p>{appointment.userId.name}</p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userId.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
            </p>
            <div className="flex items-center gap-2">
              <img
                src={appointment.doctorId.image}
                className="w-8 rounded-full bg-gray-200"
                alt=""
              />{' '}
              <p>{appointment.doctorId.name}</p>
            </div>
            <p>
              {currency}
              {appointment.amount}
            </p>
            {appointment.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <button
                onClick={() =>
                  adminCancelAppointment({ appointmentId: appointment._id })
                }
                className="px-4 py-1 bg-red-400 text-white text-xs font-medium rounded hover:bg-red-600 transition-all cursor-pointer"
              >
                {isCancellingAppointment ? 'Cancelling' : 'Cancel'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
