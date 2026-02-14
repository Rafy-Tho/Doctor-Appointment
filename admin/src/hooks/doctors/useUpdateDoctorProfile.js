import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import doctorApiService from '../../configs/doctorApiServices';
import { showError, showSuccess } from '../../utils/toast';
import useAuth from '../useAuth';

function useUpdateDoctorProfile() {
  const queryClient = useQueryClient();
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const { mutate: updateDoctorProfile, isPending } = useMutation({
    mutationFn: (doctorData) => doctorApiService.updateProfile(doctorData),
    mutationKey: ['doctor-update'],
    onSuccess: (data) => {
      showSuccess('Doctor profile updated successfully');
      updateProfile({ user: data?.doctor });
      queryClient.invalidateQueries({ queryKey: ['doctor'] });
      navigate('/doctor-profile');
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  return {
    updateDoctorProfile,
    isPending,
  };
}

export default useUpdateDoctorProfile;
