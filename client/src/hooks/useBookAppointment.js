import { useMutation } from '@tanstack/react-query';
import userApiService from '../configs/userApiServices';
import { showError, showSuccess } from '../utils/toast';

function useBookAppointment() {
  const {
    mutate: bookAppointment,
    isPending: isBooking,
    error: bookingError,
  } = useMutation({
    mutationFn: (data) => userApiService.bookAppointment(data),
    mutationKey: ['bookAppointment'],
    onSuccess: (data) => {
      showSuccess(data.message);
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { bookAppointment, isBooking, bookingError };
}

export default useBookAppointment;
