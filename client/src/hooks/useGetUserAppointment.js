import { useQuery } from '@tanstack/react-query';
import userApiService from '../configs/userApiServices';
import { useEffect } from 'react';
import { showError } from '../utils/toast';

function useGetUserAppointment() {
  const {
    data: { appointments } = {},
    isPending: isGettingAppointments,
    error: appointmentError,
  } = useQuery({
    queryKey: ['user-appointments'],
    queryFn: userApiService.listAppointments,
  });
  useEffect(() => {
    if (appointmentError) {
      showError(appointmentError.message);
    }
  }, [appointmentError]);
  return { appointments, isGettingAppointments, appointmentError };
}

export default useGetUserAppointment;
