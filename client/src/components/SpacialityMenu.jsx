import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets_frontend/assets';

function SpacialityMenu() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 " id="speciality">
      <h1 className="text-3xl font-bold">Find by Speciality</h1>
      <p className="text-center text-sm ">
        We have a wide range of specialities to choose from. or a child doctor,
        we have the right doctor for you.
      </p>
      <div className="flex gap-4 sm:justify-center pt-5 w-full overflow-scroll">
        {specialityData.map((item) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={item.id}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-xs cursor-pointer shrink-0 hover:translate-y-2.5"
          >
            <img
              className="w-16
            sm:w-24 mb-2"
              src={item.image}
              alt=""
            />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SpacialityMenu;
