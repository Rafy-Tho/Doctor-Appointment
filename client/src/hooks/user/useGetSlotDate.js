import { useQuery } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useGetSlotDate({ doctorId }) {
  const {
    data: { appointments } = {},
    isPending: isSlotPending,
    error: slotError,
    isError,
  } = useQuery({
    queryKey: ['slotDate', doctorId],
    queryFn: () => userApiService.getSlotDate({ doctorId }),
  });
  useEffect(() => {
    if (isError) {
      showError(slotError.message);
    }
  }, [isError, slotError]);
  return { appointments, isSlotPending, slotError };
}

export default useGetSlotDate;
