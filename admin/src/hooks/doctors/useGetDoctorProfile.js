import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import doctorApiService from '../../configs/doctorApiServices';
import { showError } from '../../utils/toast';
import useAuth from '../useAuth';

function useGetDoctorProfile() {
  const { getProfile } = useAuth();

  const {
    data: { doctor } = {},
    isPending,
    error,
  } = useQuery({
    queryFn: doctorApiService.getProfile,
    queryKey: ['doctor'],
  });

  useEffect(() => {
    if (doctor) {
      getProfile({ user: doctor });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctor]);
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);
  return {
    doctor,
    isPending,
    error,
  };
}

export default useGetDoctorProfile;
