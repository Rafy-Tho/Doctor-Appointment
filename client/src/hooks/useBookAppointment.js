import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useBookAppointment = ({ token, getDoctorsData }) => {
  const navigate = useNavigate();

  const bookAppointment = async ({ docId, docSlots, slotIndex, slotTime }) => {
    if (!token) {
      toast.warning('Login to book appointment');
      navigate('/login');
      return;
    }

    if (!slotTime) {
      toast.warning('Please select a time slot');
      return;
    }

    if (!docSlots?.[slotIndex]?.length) {
      toast.error('No slots available for this day');
      return;
    }

    const date = docSlots[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } },
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return { bookAppointment };
};
