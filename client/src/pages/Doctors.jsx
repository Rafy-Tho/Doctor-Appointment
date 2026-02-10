import { NavLink, useNavigate, useParams } from 'react-router-dom';

import useGetDoctors from '../hooks/doctors/useGetDoctors';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
const specialities = [
  'General physician',
  'Gynecologist',
  'Pediatrician',
  'Dermatologies',
  'Neurologist',
  'Gastroenterologist',
];
function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { data, isPending, error } = useGetDoctors();
  if (isPending) return <Loader />;
  if (error)
    return (
      <ErrorMessage message={error?.message || 'Failed to load doctors'} />
    );

  const { doctors } = data;
  // Apply filter when speciality or doctors change
  const filterDoctors = speciality
    ? doctors.filter((doctor) => doctor.speciality === speciality)
    : doctors;
  return (
    <div>
      <p className="text-2xl font-bold	 text-center">
        Browse through the doctors speciality
      </p>
      <div className="mt-10">
        <div className="text-md font-medium flex gap-4 flex-wrap mb-10">
          {specialities.map((speciality, index) => (
            <NavLink
              key={index}
              to={`/doctors/${speciality}`}
              className={({ isActive }) =>
                `w-fit rounded-lg px-3 py-1 border transition-all duration-200
       ${
         isActive
           ? 'border-slate-400 bg-slate-400 text-white dark:text-slate-800'
           : 'border-slate-300 hover:bg-slate-200 hover:text-slate-800 hover:-translate-y-0.5'
       }`
              }
            >
              {speciality}
            </NavLink>
          ))}
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0 max-sm:w-xs">
          {filterDoctors.slice(0, 10).map((doctor, index) => (
            <div
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
              key={index}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              <img src={doctor.image} alt="" className="bg" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium">{doctor.name}</p>
                <p className="text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
