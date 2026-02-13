import { useQuery } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useGetAdminDashboard() {
  const {
    data: dashboardStats,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: adminApiService.getDashboard,
  });
  useEffect(() => {
    if (isError) {
      showError(error.message);
    }
  }, [isError, error]);
  return {
    dashboardStats,
    isPending,
    error,
  };
}

export default useGetAdminDashboard;
