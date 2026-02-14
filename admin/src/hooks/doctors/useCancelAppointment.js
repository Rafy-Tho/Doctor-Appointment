import { useMutation, useQueryClient } from '@tanstack/react-query';
import doctorApiService from '../../configs/doctorApiServices';
import { showError, showSuccess } from '../../utils/toast';

function useCancelAppointment() {
  const queryClient = useQueryClient();
  const {
    mutate: cancelAppointment,
    isPending: isCancelling,
    variables: cancelVariables,
  } = useMutation({
    mutationFn: ({ appointmentId }) =>
      doctorApiService.cancelAppointment({ appointmentId }),
    mutationKey: ['cancel-appointment'],
    onSuccess: (data) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ['doctor-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { cancelAppointment, isCancelling, cancelVariables };
}

export default useCancelAppointment;
