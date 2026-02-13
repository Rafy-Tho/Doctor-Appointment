import { useMutation } from '@tanstack/react-query';
import userApiService from '../../configs/userApiServices';
import { showError, showSuccess } from '../../utils/toast';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: (formData) => userApiService.updateProfile(formData),
    mutationKey: ['user-update'],
    onSuccess: (data) => {
      console.log({ data });
      showSuccess('User profile updated successfully');
      updateProfile({ user: data?.user });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/my-profile');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    updateUserProfile,
    isPending,
  };
}

export default useUpdateUserProfile;
