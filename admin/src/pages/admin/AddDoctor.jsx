import { useReducer } from 'react';
import {
  doctorFormReducer,
  initialState,
} from '../../reducer/doctorFormReducer';
import { assets } from '../../assets/assets';
import { validateAll } from '../../utils/helper';
import { experience, specialities } from '../../utils/constant';
import useAdminAddDoctor from '../../hooks/admin/useAdminAddDoctor';
import ErrorMessage from '../../components/ErrorMessage';

function AddDoctor() {
  const { addDoctor, isPending, error } = useAdminAddDoctor();
  const [state, dispatch] = useReducer(doctorFormReducer, initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE',
      payload: { name, value },
    });
  };

  const handleFileChange = (e) => {
    dispatch({
      type: 'SET_FILE',
      payload: { name: 'image', value: e.target.files[0] },
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const errors = validateAll(state.values);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    const formData = new FormData();
    formData.append('image', state.values.image);
    formData.append('name', state.values.name);
    formData.append('email', state.values.email);
    formData.append('password', state.values.password);
    formData.append('experience', state.values.experience);
    formData.append('fees', Number(state.values.fees));
    formData.append('about', state.values.about);
    formData.append('speciality', state.values.speciality);
    formData.append('degree', state.values.degree);
    formData.append(
      'address',
      JSON.stringify({
        line1: state.values.address1,
        line2: state.values.address2,
      }),
    );
    addDoctor(
      { formData },
      {
        onSuccess: () => {
          dispatch({ type: 'RESET_FORM' });
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      {error && <ErrorMessage message={error.message} />}
      <div className="bg-slate-100 dark:bg-slate-800 px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll dark:text-slate-200 text-slate-500">
        <div className="mb-8">
          <div className="flex items-center gap-4  text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={
                  state.values.image
                    ? URL.createObjectURL(state.values.image)
                    : assets.doctor_icon
                }
                alt=""
              />
            </label>
            <input
              onChange={handleFileChange}
              type="file"
              name="image"
              id="doc-img"
              hidden
            />
            <p>
              Upload doctor <br /> picture
            </p>
          </div>
          {state.errors.image && (
            <p className="text-red-500 text-sm">{state.errors.image}</p>
          )}
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 ">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Your name</p>
              <input
                name="name"
                autoComplete="new-name"
                value={state.values.name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
              />

              {state.errors.name && (
                <p className="text-red-500 text-sm">{state.errors.name}</p>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                name="email"
                autoComplete="new-email"
                value={state.values.email}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
              {state.errors.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Set Password</p>
              <input
                name="password"
                value={state.values.password}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                minLength={8}
                required
                autoComplete="new-password"
              />
              {state.errors.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                name="experience"
                value={state.values.experience}
                onChange={handleChange}
                className="border rounded px-2 py-2"
              >
                {experience.map((exp) => (
                  <option key={exp} value={`${exp} Year`}>
                    {`${exp} Year${exp > 1 ? 's' : ''}`}
                  </option>
                ))}
              </select>
              {state.errors.experience && (
                <p className="text-red-500 text-sm">
                  {state.errors.experience}
                </p>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                name="fees"
                autoComplete="new-fees"
                value={state.values.fees}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Doctor fees"
                min={0}
                required
              />
              {state.errors.fees && (
                <p className="text-red-500 text-sm">{state.errors.fees}</p>
              )}
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name="speciality"
                value={state.values.speciality}
                onChange={handleChange}
                className="border rounded px-2 py-2"
              >
                {specialities.map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
              {state.errors.speciality && (
                <p className="text-red-500 text-sm">
                  {state.errors.speciality}
                </p>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Degree</p>
              <input
                name="degree"
                autoComplete="new-degree"
                value={state.values.degree}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Degree"
                required
              />
              {state.errors.degree && (
                <p className="text-red-500 text-sm">{state.errors.degree}</p>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                autoComplete="new-address1"
                name="address1"
                value={state.values.address1}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                autoComplete="new-address2"
                name="address2"
                value={state.values.address2}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            name="about"
            autoComplete="new-about"
            value={state.values.about}
            onChange={handleChange}
            className="w-full px-4 pt-2 border rounded"
            rows={5}
            required
            placeholder="write about doctor"
          ></textarea>
          {state.errors.about && (
            <p className="text-red-500 text-sm">{state.errors.about}</p>
          )}
        </div>

        <button
          type="submit"
          className={` px-10 py-3 mt-4  rounded-full ${
            isPending
              ? 'cursor-not-allowed bg-blue-300'
              : 'bg-blue-400 cursor-pointer '
          }`}
        >
          {isPending ? 'Adding...' : 'Add doctor'}
        </button>
      </div>
    </form>
  );
}

export default AddDoctor;
// old form that includes handleBlur function
// function AddDoctor() {
//   const [state, dispatch] = useReducer(doctorFormReducer, initialState);
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     dispatch({
//       type: 'CHANGE',
//       payload: { name, value },
//     });
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;

//     dispatch({
//       type: 'BLUR',
//       payload: { name, value },
//     });
//   };

//   const handleFileChange = (e) => {
//     dispatch({
//       type: 'SET_FILE',
//       payload: { name: 'image', value: e.target.files[0] },
//     });
//   };
//   const handleFileBlur = (e) => {
//     const { name } = e.target;

//     dispatch({
//       type: 'FILE_BLUR',
//       payload: { name, value: e.target.files[0] },
//     });
//   };
//   const onSubmitHandler = (e) => {
//     e.preventDefault();

//     const errors = validateAll(state.values);

//     if (Object.keys(errors).length > 0) {
//       dispatch({ type: 'SET_ERRORS', payload: errors });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', state.values.image);
//     formData.append('name', state.values.name);
//     formData.append('email', state.values.email);
//     formData.append('password', state.values.password);
//     formData.append('experience', state.values.experience);
//     formData.append('fees', Number(state.values.fees));
//     formData.append('about', state.values.about);
//     formData.append('speciality', state.values.speciality);
//     formData.append('degree', state.values.degree);
//     formData.append(
//       'address',
//       JSON.stringify({
//         line1: state.values.address1,
//         line2: state.values.address2,
//       }),
//     );

//     console.log('Form Submitted Successfully');
//   };
//   console.log(1);
//   return (
//     <form onSubmit={onSubmitHandler} className="m-5 w-full">
//       <p className="mb-3 text-lg font-medium">Add Doctor</p>

//       <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
//         <div className="mb-8">
//           <div className="flex items-center gap-4  text-gray-500">
//             <label htmlFor="doc-img">
//               <img
//                 className="w-16 bg-gray-100 rounded-full cursor-pointer"
//                 src={
//                   state.values.image
//                     ? URL.createObjectURL(state.values.image)
//                     : assets.doctor_icon
//                 }
//                 alt=""
//               />
//             </label>
//             <input
//               onChange={handleFileChange}
//               type="file"
//               onBlur={handleFileBlur}
//               name="image"
//               id="doc-img"
//               hidden
//             />
//             <p>
//               Upload doctor <br /> picture
//             </p>
//           </div>
//           {state.errors.image && (
//             <p className="text-red-500 text-sm">{state.errors.image}</p>
//           )}
//         </div>
//         <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Your name</p>
//               <input
//                 name="name"
//                 autoComplete="new-name"
//                 value={state.values.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Name"
//               />

//               {state.touched.name && state.errors.name && (
//                 <p className="text-red-500 text-sm">{state.errors.name}</p>
//               )}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Email</p>
//               <input
//                 name="email"
//                 autoComplete="new-email"
//                 value={state.values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="email"
//                 placeholder="Email"
//                 required
//               />
//               {state.touched.email && state.errors.email && (
//                 <p className="text-red-500 text-sm">{state.errors.email}</p>
//               )}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Set Password</p>
//               <input
//                 name="password"
//                 value={state.values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="password"
//                 placeholder="Password"
//                 minLength={8}
//                 required
//                 autoComplete="new-password"
//               />
//               {state.touched.password && state.errors.password && (
//                 <p className="text-red-500 text-sm">{state.errors.password}</p>
//               )}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Experience</p>
//               <select
//                 name="experience"
//                 value={state.values.experience}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-2 py-2"
//               >
//                 {experience.map((exp) => (
//                   <option key={exp} value={`${exp} Year`}>
//                     {`${exp} Year${exp > 1 ? 's' : ''}`}
//                   </option>
//                 ))}
//               </select>
//               {state.touched.experience && state.errors.experience && (
//                 <p className="text-red-500 text-sm">
//                   {state.errors.experience}
//                 </p>
//               )}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Fees</p>
//               <input
//                 name="fees"
//                 autoComplete="new-fees"
//                 value={state.values.fees}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="number"
//                 placeholder="Doctor fees"
//                 min={0}
//                 required
//               />
//               {state.touched.fees && state.errors.fees && (
//                 <p className="text-red-500 text-sm">{state.errors.fees}</p>
//               )}
//             </div>
//           </div>

//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Speciality</p>
//               <select
//                 name="speciality"
//                 value={state.values.speciality}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-2 py-2"
//               >
//                 {specialities.map((speciality) => (
//                   <option key={speciality} value={speciality}>
//                     {speciality}
//                   </option>
//                 ))}
//               </select>
//               {state.touched.speciality && state.errors.speciality && (
//                 <p className="text-red-500 text-sm">
//                   {state.errors.speciality}
//                 </p>
//               )}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Degree</p>
//               <input
//                 name="degree"
//                 autoComplete="new-degree"
//                 value={state.values.degree}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Degree"
//                 required
//               />
//               {state.touched.degree && state.errors.degree && (
//                 <p className="text-red-500 text-sm">{state.errors.degree}</p>
//               )}
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Address</p>
//               <input
//                 autoComplete="new-address1"
//                 name="address1"
//                 value={state.values.address1}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Address 1"
//                 required
//               />
//               <input
//                 autoComplete="new-address2"
//                 name="address2"
//                 value={state.values.address2}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Address 2"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="mt-4 mb-2">About Doctor</p>
//           <textarea
//             name="about"
//             autoComplete="new-about"
//             value={state.values.about}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className="w-full px-4 pt-2 border rounded"
//             rows={5}
//             required
//             placeholder="write about doctor"
//           ></textarea>
//           {state.touched.about && state.errors.about && (
//             <p className="text-red-500 text-sm">{state.errors.about}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-400 px-10 py-3 mt-4  rounded-full"
//         >
//           Add doctor
//         </button>
//       </div>
//     </form>
//   );
// }
