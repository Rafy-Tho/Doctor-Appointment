import { useMutation } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { showError, showSuccess } from '../../utils/toast';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';

function useUserLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: (userData) => userApiService.login(userData),
    mutationKey: ['user'],
    onSuccess: (data) => {
      showSuccess('User logged in successfully');
      login({ user: data?.user, token: data?.token });
      navigate('/');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    loginUser,
    isPending,
    error,
  };
}

export default useUserLogin;
