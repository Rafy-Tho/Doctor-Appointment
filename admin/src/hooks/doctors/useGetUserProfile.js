import { useQuery } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { showError } from '../../utils/toast';
import useAuth from '../useAuth';
import { useEffect } from 'react';

function useGetUserProfile() {
  const { getProfile } = useAuth();
  const {
    data: userData,
    isPending,
    error,
  } = useQuery({
    queryFn: () => userApiService.getProfile(),
    queryKey: ['user'],
  });
  useEffect(() => {
    if (userData?.user) {
      getProfile({ user: userData.user });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.user]);
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);
  return {
    userData,
    isPending,
    error,
  };
}

export default useGetUserProfile;
