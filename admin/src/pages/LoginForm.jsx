import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function LoginForm({
  onSubmitHandler,
  errors,
  email,
  password,
  setEmail,
  setPassword,
  state,
  isPending,
}) {
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl  text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="">{state}</span> Login
        </p>
        <div className="w-full ">
          <p className="dark:text-slate-300">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border  rounded w-full p-2 mt-1"
            type="email"
            required
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>
        <div className="w-full ">
          <p className="dark:text-slate-300">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border  rounded w-full p-2 mt-1"
            type="password"
            required
          />
          {errors.password && <ErrorMessage message={errors.password} />}
        </div>
        <button
          className={`${isPending ? 'cursor-not-allowed bg-blue-300' : 'bg-blue-400 cursor-pointer'} w-full py-2 rounded-md text-base `}
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <Link
              to="/login/doctor"
              className="underline cursor-pointer text-blue-400"
            >
              Click here
            </Link>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <Link
              to="/login/admin"
              className="underline cursor-pointer text-blue-400"
            >
              Click here
            </Link>
          </p>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
