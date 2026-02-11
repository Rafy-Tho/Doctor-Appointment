import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserLogin from '../hooks/user/useUserLogin';
import { validateLogin } from '../utils/validators';

function Login() {
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('John@1234');
  const [errors, setErrors] = useState({});
  const { loginUser, isPending } = useUserLogin();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    loginUser({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg">
        <p className="text-2xl font-semibold">Login</p>
        <p>Please log in to book appointment</p>

        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-slate-400 rounded w-full p-2 mt-1"
            type="email"
            required
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-slate-400 rounded w-full p-2 mt-1"
            type="password"
            required
          />
          {errors?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          className={`${isPending ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-500 cursor-pointer'} text-slate-800 w-full py-2 my-2 rounded-md text-base`}
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Create an new account?{' '}
          <Link
            onClick={() => scrollTo(0, 0)}
            to="/register"
            className=" text-blue-500 underline cursor-pointer"
          >
            Click here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
