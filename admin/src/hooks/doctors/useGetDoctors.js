import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import doctorApiService from '../../configs/doctorApiServices';
import { showError } from '../../utils/toast';

const useGetDoctors = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorApiService.getDoctorsList,
  });

  useEffect(() => {
    if (error) {
      showError(error?.message || 'Failed to load doctors');
    }
  }, [error]);

  return { data, isPending, error };
};

export default useGetDoctors;
