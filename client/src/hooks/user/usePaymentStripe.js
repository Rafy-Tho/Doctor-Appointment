import { useMutation } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { showError, showSuccess } from '../../utils/toast';

function usePaymentStripe() {
  const { mutate: paymentStripe, isPending } = useMutation({
    mutationFn: ({ appointmentId }) =>
      userApiService.paymentStripe({ appointmentId }),
    mutationKey: ['paymentStripe'],
    onSuccess: (data) => {
      showSuccess(data.message);
      window.location.replace(data.session_url);
    },
    onError: (error) => {
      showError(error.message);
    },
  });
  return { paymentStripe, isPending };
}

export default usePaymentStripe;
