import { useQuery } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';

function useGetSlotDate(doctorId) {
  const {
    data: { appointments } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ['slotDate'],
    queryFn: () => userApiService.getSlotDate(doctorId),
  });
  return { appointments, isPending, error };
}

export default useGetSlotDate;
