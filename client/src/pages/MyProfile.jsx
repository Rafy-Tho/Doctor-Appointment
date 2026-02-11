import { Link } from 'react-router-dom';
import useGetUserProfile from '../hooks/user/useGetUserProfile';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

function MyProfile() {
  const { userData, isLoading, error } = useGetUserProfile();
  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage message={error?.message || 'Failed to load profile'} />
    );
  return (
    <div className="max-w-lg flex flex-col gap-4 text-sm pt-5 mx-auto">
      {/* PROFILE IMAGE */}
      <div className="flex justify-center">
        <img
          className="w-36 rounded"
          src={userData?.user?.image}
          alt="Profile"
        />
      </div>

      {/* NAME */}
      <h2 className="text-3xl font-medium text-center">
        {userData?.user?.name}
      </h2>

      <hr className=" h-[1px] border-none" />

      {/* CONTACT INFO */}
      <div>
        <p className=" underline mt-3">CONTACT INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 ">
          <p className="font-medium">Email:</p>
          <p className="text-blue-400">{userData?.user?.email}</p>

          <p className="font-medium">Phone:</p>
          <p>{userData?.user?.phone || '—'}</p>

          <p className="font-medium">Address:</p>
          {userData?.user?.address?.line1 || userData?.user?.address?.line2 ? (
            <p>
              {userData?.user?.address?.line1}
              <br />
              {userData?.user?.address?.line2}
            </p>
          ) : (
            <p>Not Provided</p>
          )}
        </div>
      </div>

      {/* BASIC INFO */}
      <div>
        <p className=" underline mt-3">BASIC INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>
          <p>{userData?.user?.gender || 'Not Selected'}</p>

          <p className="font-medium">Birthday:</p>
          <p>{userData?.user?.dob || '—'}</p>
        </div>
      </div>

      {/* EDIT PROFILE BUTTON */}
      <div className="flex justify-center">
        <Link
          to="/my-profile/edit"
          className="bg-blue-400  px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default MyProfile;
