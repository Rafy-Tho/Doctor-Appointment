import { useQuery } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useGetDoctorList() {
  const {
    data: { doctors } = {},
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ['doctor-list'],
    queryFn: adminApiService.getAllDoctors,
  });
  useEffect(() => {
    if (isError) {
      showError(error.message);
    }
  }, [isError, error]);
  return { doctors, isPending, error };
}

export default useGetDoctorList;
