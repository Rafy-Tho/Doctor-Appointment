import { useMutation } from '@tanstack/react-query';
import userApiService from '../configs/userApiServices';
import { showError, showSuccess } from '../utils/toast';

function useCancelAppointment() {
  const { mutate: cancelAppointment, isPending: isCancellingAppointment } =
    useMutation({
      mutationFn: (data) => userApiService.cancelAppointment(data),
      onSuccess: () => {
        showSuccess('Appointment cancelled successfully');
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  return { cancelAppointment, isCancellingAppointment };
}

export default useCancelAppointment;
