import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import useGetDoctors from '../hooks/doctors/useGetDoctors';
import useGetSlotDate from '../hooks/user/useGetSlotDate';
import useGenerateSlots from '../hooks/useGenerateSlots';
import useBookAppointment from '../hooks/useBookAppointment';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { currencySymbol, daysOfWeek } from '../utils/constant';
import { showWarning } from '../utils/toast';

function Appointment() {
  const { doctorId } = useParams();
  const { data, isPending, error } = useGetDoctors();
  const { appointments, isSlotPending, slotError } = useGetSlotDate({
    doctorId,
  });
  const { bookAppointment, isBooking } = useBookAppointment();
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const docInfo = data?.doctors?.find((doc) => doc._id === doctorId);

  // Generate slots for next 7 days
  const { docSlots } = useGenerateSlots({ appointments, doctorId });

  const onBookAppointment = () => {
    if (!selectedSlot) {
      showWarning('Please select a time slot');
      return;
    }
    bookAppointment({
      doctorId,
      slotDate: selectedSlot.datetime.getTime(), // send timestamp
    });
  };

  if (isPending || isSlotPending) return <Loader />;
  if (error || slotError)
    return <ErrorMessage message={error?.message || slotError?.message} />;

  return (
    <div>
      {/* ---------- Doctor Details ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>

        <div className="flex-1 border rounded-lg p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----- Doc Info ----- */}
          <p className="flex items-center gap-2 text-3xl font-medium ">
            {docInfo.name}{' '}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          {/* ----- About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium mt-3">
              About <img className="w-3" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm max-w-[700px] mt-1">{docInfo.about}</p>
          </div>

          <p className="font-medium mt-4">
            Appointment fee:{' '}
            <span>
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* ---------- Booking Slots ---------- */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium">
        <p>Booking slots</p>

        {/* Days Selector */}
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots?.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSelectedSlot(null); // reset selected slot when changing day
              }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? 'bg-blue-400 text-white' : 'border'
              }`}
            >
              <p>{daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}</p>
              <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.map((slot, idx) => (
            <p
              key={idx}
              onClick={() => setSelectedSlot(slot)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                selectedSlot === slot ? 'bg-blue-400 text-white' : 'border'
              }`}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={onBookAppointment}
          disabled={!selectedSlot || isBooking}
          className="bg-blue-400 text-white text-sm font-light px-20 py-3 rounded-full my-6 disabled:opacity-50"
        >
          {isBooking ? 'Booking...' : 'Book an appointment'}
        </button>
      </div>
    </div>
  );
}

export default Appointment;
