import { assets } from '../assets/assets';

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 ">
        <p>
          CONTACT <span className=" font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-90"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-lg ">OUR OFFICE</p>
          <p className=" ">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className=" ">
            Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com
          </p>
          <p className=" font-semibold text-lg ">CAREERS AT PRESCRIPTO</p>
          <p className=" ">Learn more about our teams and job openings.</p>
          <button className="border  px-8 py-4 text-sm  transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
