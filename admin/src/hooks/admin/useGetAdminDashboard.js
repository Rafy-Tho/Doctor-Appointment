import { useQuery } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useGetAdminDashboard() {
  const {
    data: dashboardStats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => adminApiService.getDashboard,
  });
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);
  return {
    dashboardStats,
    isLoading,
    error,
  };
}

export default useGetAdminDashboard;
