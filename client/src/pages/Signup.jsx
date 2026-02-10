import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserRegister from '../hooks/user/useUserRegister';

import { validateSignup } from '../utils/validators';

function Signup() {
  const [name, setName] = useState('john_doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('John@1234');
  const [errors, setErrors] = useState({});
  const { registerUser, isPending } = useUserRegister();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setErrors({});
    const validationErrors = validateSignup({ name, email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerUser({ name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-sm shadow-lg">
        <p className="text-2xl font-semibold">Create Account</p>
        <p>Please sign up to book appointment</p>

        <div className="w-full ">
          <p>Full Name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border border-slate-400 rounded w-full p-2 mt-1"
            type="text"
            required
          />
          {errors?.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

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
          disabled={isPending}
          className={` text-slate-800  w-full py-2 my-2 rounded-md text-base cursor-pointer ${
            isPending ? 'cursor-not-allowed bg-slate-400' : 'bg-blue-500'
          }`}
        >
          {isPending ? 'Creating account...' : 'Create account'}
        </button>
        <p>
          Already have an account?{' '}
          <Link
            onClick={() => scrollTo(0, 0)}
            to="/login"
            className=" text-blue-500 underline cursor-pointer"
          >
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;
