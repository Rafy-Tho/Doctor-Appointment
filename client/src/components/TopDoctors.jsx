import { useNavigate } from 'react-router-dom';
import useGetDoctors from '../hooks/doctors/useGetDoctors';
function TopDoctors() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDoctors();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No doctors available</p>;
  const { doctors } = data;
  console.log(doctors);
  return (
    <div className="flex flex-col items-center gap-4 lg:my-16 md:my-10 my-6 md:mx-10 ">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="text-center text-sm">
        Simply brows through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0 max-sm:w-xs">
        {doctors.slice(0, 10).map((doctor, index) => (
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
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-blue-300  px-4 py-2 rounded-md dark:text-slate-900"
      >
        More Doctors
      </button>
    </div>
  );
}

export default TopDoctors;
