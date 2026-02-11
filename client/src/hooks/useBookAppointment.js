import { QueryClient, useMutation } from '@tanstack/react-query';
import userApiService from '../configs/userApiServices';
import { showError, showSuccess } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

function useBookAppointment() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const {
    mutate: bookAppointment,
    isPending: isBooking,
    error: bookingError,
  } = useMutation({
    mutationFn: (data) => userApiService.bookAppointment(data),
    mutationKey: ['bookAppointment'],
    onSuccess: (data) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ['user-appointments'] });
      navigate('/my-appointment');
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { bookAppointment, isBooking, bookingError };
}

export default useBookAppointment;
