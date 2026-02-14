import { useState } from 'react';
import useDoctorLogin from '../hooks/doctors/useDoctorLogin';
import { validateLogin } from '../utils/validators';
import LoginForm from './LoginForm';

function DoctorLogin() {
  const [email, setEmail] = useState('richard.james@example.com');
  const [password, setPassword] = useState('StrongPass123!');
  const [errors, setErrors] = useState({});
  const { loginDoctor, isPending } = useDoctorLogin();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    loginDoctor({ email, password });
  };

  return (
    <LoginForm
      onSubmitHandler={onSubmitHandler}
      errors={errors}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      state={'Doctor'}
      isPending={isPending}
    />
  );
}

export default DoctorLogin;
