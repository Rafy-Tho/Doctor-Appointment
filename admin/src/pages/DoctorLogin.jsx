import { useState } from 'react';
import Loader from '../components/Loader';
import { validateLogin } from '../utils/validators';
import LoginForm from './LoginForm';
import useDoctorLogin from '../hooks/doctors/useDoctorLogin';

function DoctorLogin() {
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('John@1234');
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
