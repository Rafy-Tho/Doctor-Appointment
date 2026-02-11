import { useQuery } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useGetSlotDate({ doctorId }) {
  const {
    data: { appointments } = {},
    isPending: isSlotPending,
    error: slotError,
  } = useQuery({
    queryKey: ['slotDate', doctorId],
    queryFn: () => userApiService.getSlotDate({ doctorId }),
  });
  useEffect(() => {
    if (slotError) {
      showError(slotError.message);
    }
  }, [slotError]);
  return { appointments, isSlotPending, slotError };
}

export default useGetSlotDate;
