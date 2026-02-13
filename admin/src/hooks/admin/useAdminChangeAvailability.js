import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { showError, showSuccess } from '../../utils/toast';

function useAdminChangeAvailability() {
  const queryClient = useQueryClient();
  const {
    mutate: changeAvailability,
    isPending: isChangingAvailability,
    variables,
  } = useMutation({
    mutationFn: ({ doctorId }) =>
      adminApiService.changeDoctorAvailability({ doctorId }),
    onSuccess: (data) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ['doctor-list'] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { changeAvailability, isChangingAvailability, variables };
}

export default useAdminChangeAvailability;
