import { useState } from 'react';
import Loader from '../components/Loader';
import useAdminLogin from '../hooks/admin/useAdminLogin';
import { validateLogin } from '../utils/validators';
import LoginForm from './LoginForm';

function AdminLogin() {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Admin@123');
  const [errors, setErrors] = useState({});
  const { loginAdmin, isPending } = useAdminLogin();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    loginAdmin({ email, password });
  };

  return (
    <LoginForm
      onSubmitHandler={onSubmitHandler}
      errors={errors}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      state={'Admin'}
      isPending= {isPending}
    />
  );
}

export default AdminLogin;
