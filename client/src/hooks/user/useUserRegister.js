import { useMutation } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { showError, showSuccess } from '../../utils/toast';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';

function useUserRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (userData) => userApiService.register(userData),
    mutationKey: ['user'],
    onSuccess: (data) => {
      showSuccess('User registered successfully');
      register({ user: data?.user, token: data?.token });
      navigate('/');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    registerUser,
    isPending,
  };
}

export default useUserRegister;
