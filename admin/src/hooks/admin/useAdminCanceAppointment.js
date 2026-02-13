import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { showError, showSuccess } from '../utils/toast';

function useAdminCancelAppointment() {
  const queryClient = useQueryClient();
  const { mutate: adminCancelAppointment, isPending: isCancellingAppointment } =
    useMutation({
      mutationFn: ({ appointmentId }) =>
        adminApiService.cancelAppointment({ appointmentId }),
      mutationKey: ['admin-cancelAppointment'],
      onSuccess: () => {
        showSuccess('Appointment cancelled successfully');
        queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  return { adminCancelAppointment, isCancellingAppointment };
}

export default useAdminCancelAppointment;
