import { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import useCancelAppointment from '../hooks/useCancelAppointment';
import useGetUserAppointment from '../hooks/useGetUserAppointment';
import usePaymentStripe from '../hooks/user/usePaymentStripe';
import { months } from '../utils/constant';

function MyAppointment() {
  const { appointments, isGettingAppointments, appointmentError } =
    useGetUserAppointment();
  const { cancelAppointment, isCancellingAppointment } = useCancelAppointment();
  const { paymentStripe } = usePaymentStripe();
  const [payment, setPayment] = useState('');
  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return (
      dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
    );
  };
  console.log(appointments);
  if (isGettingAppointments) return <Loader />;
  if (appointmentError)
    return <ErrorMessage message={appointmentError.message} />;
  return (
    <div>
      <p className="pb-3 mt-12 text-lg font-medium  border-b">
        My appointments
      </p>
      <div className="">
        {appointments?.map((appointment, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
          >
            <div>
              <img className="w-36 " src={appointment.doctorId.image} alt="" />
            </div>
            <div className="flex-1 text-sm">
              <p className="text-base font-semibold">
                {appointment.doctorId.name}
              </p>
              <p>{appointment.doctorId.speciality}</p>
              <p className=" font-medium mt-1">Address:</p>
              <p className="">{appointment.doctorId.address.line1}</p>
              <p className="">{appointment.doctorId.address.line2}</p>
              <p className=" mt-1">
                <span className="text-sm  font-medium">Date & Time:</span>{' '}
                {slotDateFormat(appointment.slotDate)} | {appointment.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end text-sm text-center">
              {!appointment.cancelled &&
                !appointment.payment &&
                !appointment.isCompleted &&
                payment !== appointment._id && (
                  <button
                    onClick={() => setPayment(appointment._id)}
                    className=" sm:min-w-48 py-2 border rounded  transition-all duration-300 text-blue-400 cursor-pointer "
                  >
                    Pay Online
                  </button>
                )}
              {!appointment.cancelled &&
                !appointment.payment &&
                !appointment.isCompleted &&
                payment === appointment._id && (
                  <button
                    onClick={() =>
                      paymentStripe({ appointmentId: appointment._id })
                    }
                    className=" sm:min-w-48 py-2 border rounded transition-all duration-300 flex items-center justify-center"
                  >
                    <img
                      className="max-w-20 max-h-5"
                      src={assets.stripe_logo}
                      alt=""
                    />
                  </button>
                )}

              {!appointment.cancelled &&
                appointment.payment &&
                !appointment.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-green-400">
                    Paid
                  </button>
                )}

              {appointment.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Completed
                </button>
              )}

              {!appointment.cancelled && !appointment.isCompleted && (
                <button
                  onClick={() =>
                    cancelAppointment({ appointmentId: appointment._id })
                  }
                  className=" sm:min-w-48 py-2 border rounded  transition-all duration-300 text-red-400 cursor-pointer "
                >
                  {isCancellingAppointment
                    ? 'Cancelling...'
                    : 'Cancel appointment'}
                </button>
              )}
              {appointment.cancelled && !appointment.isCompleted && (
                <button className="sm:min-w-48 py-2 border  text-red-400">
                  Appointment cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyAppointment;
