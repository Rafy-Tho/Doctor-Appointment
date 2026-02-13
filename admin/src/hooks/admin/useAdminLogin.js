import { useMutation } from '@tanstack/react-query';

import { showError, showSuccess } from '../../utils/toast';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';
import adminApiService from '../../configs/adminApiServices';

function useAdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginAdmin, isPending } = useMutation({
    mutationFn: (adminData) => adminApiService.login(adminData),
    mutationKey: ['admin-login'],
    onSuccess: (data) => {
      console.log({ data });
      showSuccess('Admin logged in successfully');
      login({ user: data?.user, token: data?.token });
      navigate('/');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    loginAdmin,
    isPending,
  };
}

export default useAdminLogin;
