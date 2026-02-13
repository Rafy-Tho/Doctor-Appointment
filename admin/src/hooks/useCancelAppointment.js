import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApiService from '../configs/userApiServices';
import { showError, showSuccess } from '../utils/toast';

function useCancelAppointment() {
  const queryClient = useQueryClient();
  const { mutate: cancelAppointment, isPending: isCancellingAppointment } =
    useMutation({
      mutationFn: ({ appointmentId }) =>
        userApiService.cancelAppointment({ appointmentId }),
      mutationKey: ['cancelAppointment'],
      onSuccess: () => {
        showSuccess('Appointment cancelled successfully');
        queryClient.invalidateQueries({ queryKey: ['user-appointments'] });
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  return { cancelAppointment, isCancellingAppointment };
}

export default useCancelAppointment;
