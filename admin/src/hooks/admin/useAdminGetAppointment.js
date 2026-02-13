import { useQuery } from '@tanstack/react-query';
import adminApiService from '../../configs/adminApiServices';
import { useEffect } from 'react';
import { showError } from '../../utils/toast';

function useAdminGetAppointment() {
  const {
    data: { appointments } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ['admin-appointments'],
    queryFn: adminApiService.getAppointments,
  });
  useEffect(() => {
    if (error) {
      showError(error.message);
    }
  }, [error]);
  return {
    appointments,
    isPending,
    error,
  };
}

export default useAdminGetAppointment;
