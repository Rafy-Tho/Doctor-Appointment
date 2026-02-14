import { useQuery } from '@tanstack/react-query';
import doctorApiService from '../../configs/doctorApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useGetDoctorDashboard() {
  const {
    data: dashboardData,
    isLoading: isLoadingDashboard,
    error: dashboardError,
    isError,
  } = useQuery({
    queryFn: doctorApiService.getDashboard,
    queryKey: ['doctor-dashboard'],
  });
  useEffect(() => {
    if (isError) {
      showError(dashboardError.message);
    }
  }, [isError, dashboardError]);
  return { dashboardData, isLoadingDashboard, dashboardError };
}

export default useGetDoctorDashboard;
