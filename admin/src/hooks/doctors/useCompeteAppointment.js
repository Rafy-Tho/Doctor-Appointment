import { useMutation, useQueryClient } from '@tanstack/react-query';
import doctorApiService from '../../configs/doctorApiServices';
import { showError, showSuccess } from '../../utils/toast';

function useCompeteAppointment() {
  const queryClient = useQueryClient();
  const {
    mutate: completeAppointment,
    isPending: isCompleting,
    variables: completeVariables,
  } = useMutation({
    mutationFn: ({ appointmentId }) =>
      doctorApiService.completeAppointment({ appointmentId }),
    mutationKey: ['complete-appointment'],
    onSuccess: (data) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ['doctor-dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { completeAppointment, isCompleting, completeVariables };
}

export default useCompeteAppointment;
