import { useNavigate } from 'react-router-dom';
import useGetDoctorProfile from '../../hooks/doctors/useGetDoctorProfile';
import { currencySymbol } from '../../utils/constant';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

function DoctorProfile() {
  const { doctor, isPending, error } = useGetDoctorProfile();
  const navigate = useNavigate();
  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="flex flex-col gap-4 m-5 bg-slate-100 dark:bg-slate-800 border">
      <div>
        <img
          className=" w-full sm:max-w-64 rounded-lg"
          src={doctor?.image}
          alt=""
        />
      </div>

      <div className="flex-1  rounded-lg p-8 py-7 ">
        <p className="flex items-center gap-2 text-3xl font-medium">
          {doctor?.name}
        </p>

        <div className="flex items-center gap-2 mt-1 ">
          <p>
            {doctor?.degree} - {doctor?.speciality}
          </p>
          <button className="py-0.5 px-2 border text-xs rounded-full">
            {doctor?.experience}
          </button>
        </div>

        <div>
          <p className="text-sm font-medium mt-3">About :</p>
          <p className="text-sm  mt-1 max-w-[700px]">{doctor?.about}</p>
        </div>

        <p className=" font-medium mt-4">
          Appointment fee:
          <span className="">
            {' '}
            {currencySymbol} {doctor?.fees}
          </span>
        </p>

        <div className="flex gap-2 py-2">
          <p>Address:</p>
          <p className="text-sm">
            {doctor?.address?.line1}
            <br />
            {doctor?.address?.line2}
          </p>
        </div>

        <div className="flex gap-2 pt-2 items-center">
          {doctor?.available ? (
            <>
              <span className="text-sm w-3 h-3 rounded-full bg-green-400"></span>
              <label>Available</label>
            </>
          ) : (
            <>
              <span className="text-sm w-3 h-3 rounded-full bg-red-400"></span>
              <label>Not Available</label>
            </>
          )}
        </div>

        <button
          onClick={() => navigate('/doctor-update-profile')}
          className="px-4 py-1 border border-primary text-sm rounded-full mt-5 bg-blue-400 text-white cursor-pointer"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default DoctorProfile;
