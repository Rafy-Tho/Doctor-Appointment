import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';
import useAdminChangeAvailability from '../../hooks/admin/useAdminChangeAvailability';
import useGetDoctorList from '../../hooks/admin/useGetDoctorList';

function DoctorsList() {
  const { doctors, isPending, error } = useGetDoctorList();
  const { changeAvailability, isChangingAvailability, variables } =
    useAdminChangeAvailability();
  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((doctor, index) => (
          <div
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500"
              src={doctor.image}
              alt=""
            />
            <div className="p-4">
              <p className=" text-lg font-medium">{doctor.name}</p>
              <p className=" text-sm">{doctor.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                {isChangingAvailability && variables.doctorId === doctor._id ? (
                  <p className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></p>
                ) : (
                  <input
                    onChange={() =>
                      changeAvailability({ doctorId: doctor._id })
                    }
                    type="checkbox"
                    checked={doctor.available}
                    disabled={isChangingAvailability}
                  />
                )}

                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsList;
