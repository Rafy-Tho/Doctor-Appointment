import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import useCancelAppointment from '../../hooks/doctors/useCancelAppointment';
import useCompeteAppointment from '../../hooks/doctors/useCompeteAppointment';
import useGetAppointment from '../../hooks/doctors/useGetAppointment';
import { currencySymbol } from '../../utils/constant';
import { calculateAge, slotDateFormat } from '../../utils/helper';

function DoctorAppointments() {
  const { appointments, isAppointmentPending, appointmentError } =
    useGetAppointment();
  const { completeAppointment, isCompleting, completeVariables } =
    useCompeteAppointment();
  const { cancelAppointment, isCancelling, cancelVariables } =
    useCancelAppointment();
  if (isAppointmentPending) {
    return <Loader />;
  }
  if (appointmentError) {
    return <ErrorMessage message={appointmentError.message} />;
  }
  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-slate-100 border rounded text-sm max-h-[80vh] overflow-y-scroll dark:bg-slate-800 dark:border-slate-700">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b dark:text-slate-300">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments?.map((appointment, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-slate-600 dark:text-slate-300 py-3 px-6 border-b hover:bg-gray-50 dark:hover:bg-slate-700"
            key={appointment._id}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={appointment.userId?.image}
                className="w-8 rounded-full"
                alt=""
              />{' '}
              <p>{appointment.userId?.name}</p>
            </div>
            <div>
              <p className="text-xs inline border border-primary px-2 rounded-full">
                {appointment.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className="max-sm:hidden">
              {calculateAge(appointment.userId?.dob)}
            </p>
            <p>
              {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
            </p>
            <p>
              {currencySymbol}
              {appointment.amount}
            </p>
            {appointment.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : appointment.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() =>
                    cancelAppointment({ appointmentId: appointment._id })
                  }
                  className=" cursor-pointer text-red-400 py-1 font-medium bg-red-100 px-2 rounded"
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
                  className=" cursor-pointer text-green-400 py-1 font-medium bg-green-100 px-2 rounded"
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
  );
}

export default DoctorAppointments;
