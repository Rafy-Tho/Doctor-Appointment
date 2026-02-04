import { assets } from '../assets/assets_frontend/assets.js';

function Header() {
  return (
    <div className="py-20">
      <div className="">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Book <br className="hidden md:block" />
              <span className="text-indigo-500">Appointment</span> With Trusted
              Doctors
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl  mb-8">
              We create beautiful and functional websites for businesses of all
              sizes.
            </p>
            <div className="flex gap-2 ">
              <a
                href="#speciality"
                className="bg-indigo-500 hover:bg-indigo-600  font-bold py-3 px-6 rounded-md text-slate-900 dark:text-slate-300"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
            <img
              src={assets.header_img}
              alt="Hero Image"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
