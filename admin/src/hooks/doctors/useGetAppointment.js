import { useQuery } from '@tanstack/react-query';
import doctorApiService from '../../configs/doctorApiServices';

function useGetAppointment() {
  const {
    data: { appointments } = {},
    isPending: isAppointmentPending,
    error: appointmentError,
  } = useQuery({
    queryKey: ['doctor-appointments'],
    queryFn: doctorApiService.getAppointments,
  });
  return {
    appointments,
    isAppointmentPending,
    appointmentError,
  };
}

export default useGetAppointment;
