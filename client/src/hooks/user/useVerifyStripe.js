import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { showError, showSuccess } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';

function useVerifyStripe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: verifyStripe, isPending } = useMutation({
    mutationFn: ({ appointmentId, sessionId }) =>
      userApiService.verifyStripe({ appointmentId, sessionId }),
    mutationKey: ['verifyStripe'],
    onSuccess: (data) => {
      if (data.success) {
        showSuccess(data.message);
      } else {
        showError(data.message);
      }
      navigate('/my-appointment');
      queryClient.invalidateQueries({ queryKey: ['user-appointments'] });
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { verifyStripe, isPending };
}

export default useVerifyStripe;
