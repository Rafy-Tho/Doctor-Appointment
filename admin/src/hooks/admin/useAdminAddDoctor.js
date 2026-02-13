import { useMutation } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { showError, showSuccess } from '../../utils/toast';
import { useQueryClient } from '@tanstack/react-query';

function useAdminAddDoctor() {
  const queryClient = useQueryClient();
  const {
    mutate: addDoctor,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ formData }) => adminApiService.createDoctor({ formData }),
    onSuccess: (data) => {
      showSuccess(data.message);
      queryClient.invalidateQueries({ queryKey: ['doctor-list'] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { addDoctor, isPending, error };
}

export default useAdminAddDoctor;
