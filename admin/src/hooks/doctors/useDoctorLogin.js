import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import doctorApiService from '../../configs/doctorApiServices';
import { showError, showSuccess } from '../../utils/toast';
import useAuth from '../useAuth';

function useDoctorLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginDoctor, isPending } = useMutation({
    mutationFn: (doctorData) => doctorApiService.login(doctorData),
    mutationKey: ['doctor-login'],
    onSuccess: (data) => {
      console.log({ data });
      showSuccess('Doctor logged in successfully');
      login({ user: data?.user, token: data?.token });
      navigate('/');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    loginDoctor,
    isPending,
  };
}

export default useDoctorLogin;
