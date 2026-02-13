import { useReducer, useState } from 'react';
import { assets } from '../assets/assets';
import ErrorMessage from '../components/ErrorMessage';
import useAuth from '../hooks/useAuth';
import useUpdateUserProfile from '../hooks/user/useUpdateUserProfile';
import { initialState, profileReducer } from '../reducer/profileReducer';
import { validateUpdateProfile } from '../utils/validators';

function UpdateProfile() {
  const { user } = useAuth();
  const { updateUserProfile, isPending } = useUpdateUserProfile();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [state, dispatch] = useReducer(profileReducer, user, initialState);
  const { values, errors } = state || {};
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validationErrors = validateUpdateProfile(values);
    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: validationErrors });
      return;
    }

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('gender', values.gender);
    formData.append('dob', values.dob);
    formData.append(
      'address',
      JSON.stringify({
        line1: values.address.line1,
        line2: values.address.line2,
      }),
    );

    if (image) formData.append('image', image);

    updateUserProfile(formData);
  };
  console.log({ userName: user.name, userImage: user.image });
  if (!user) return;
  return (
    <form
      onSubmit={onSubmitHandler}
      className="
    max-w-lg mx-auto mt-8
    bg-white dark:bg-slate-900
    rounded-xl shadow-md
    px-6 py-7
    text-sm text-gray-800 dark:text-gray-200
    space-y-6
  "
    >
      {/* PROFILE IMAGE */}
      <div className="flex justify-center">
        <label htmlFor="image" className="relative cursor-pointer group">
          <img
            className="
          w-36 h-36 object-cover rounded-full
          border-4 border-primary/30
          transition group-hover:opacity-80
        "
            src={imagePreview || user.image}
            alt=""
          />

          <div
            className="
            absolute inset-0 rounded-full
            bg-black/40 opacity-0
            group-hover:opacity-100
            flex items-center justify-center
            transition
          "
          >
            <img className="w-8" src={assets.upload_icon} alt="" />
          </div>

          <input
            onChange={(e) => {
              if (imagePreview) URL.revokeObjectURL(imagePreview);
              const file = e.target.files[0];
              setImage(file);
              setImage(file);
              setImagePreview(file ? URL.createObjectURL(file) : null);
            }}
            type="file"
            hidden
            id="image"
          />
        </label>
      </div>

      {/* NAME */}
      <div className="text-center">
        <input
          className="
        bg-transparent text-3xl font-semibold text-center
        border-b border-gray-300 dark:border-slate-600
        focus:border-primary outline-none
        pb-1
      "
          type="text"
          required
          value={values.name}
          onChange={(e) =>
            dispatch({
              type: 'CHANGE_FIELD',
              field: 'name',
              value: e.target.value,
            })
          }
        />
        {errors?.name && <ErrorMessage message={errors.name} />}
      </div>

      {/* CONTACT INFO */}
      <section>
        <p className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
          CONTACT INFORMATION
        </p>

        <div className="grid grid-cols-[110px_1fr] gap-y-3 mt-4">
          <p className="font-medium">Email</p>
          <p className="text-blue-600 dark:text-blue-400">{user.email}</p>

          <p className="font-medium">Phone</p>
          <div>
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800
                     border border-gray-300 dark:border-slate-700
                     focus:ring-2 focus:ring-primary/50 outline-none"
              type="text"
              value={values.phone}
              onChange={(e) =>
                dispatch({
                  type: 'CHANGE_FIELD',
                  field: 'phone',
                  value: e.target.value,
                })
              }
            />
            {errors?.phone && <ErrorMessage message={errors.phone} />}
          </div>

          <p className="font-medium">Address</p>
          <div className="space-y-2">
            <input
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800
                     border border-gray-300 dark:border-slate-700
                     focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Line 1"
              value={values.address.line1}
              onChange={(e) =>
                dispatch({
                  type: 'CHANGE_ADDRESS',
                  field: 'line1',
                  value: e.target.value,
                })
              }
            />
            {errors?.line1 && <ErrorMessage message={errors.line1} />}

            <input
              className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800
                     border border-gray-300 dark:border-slate-700
                     focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Line 2"
              value={values.address.line2}
              onChange={(e) =>
                dispatch({
                  type: 'CHANGE_ADDRESS',
                  field: 'line2',
                  value: e.target.value,
                })
              }
            />
            {errors?.line2 && <ErrorMessage message={errors.line2} />}
          </div>
        </div>
      </section>

      {/* BASIC INFO */}
      <section>
        <p className="text-xs font-semibold tracking-widest text-gray-500 dark:text-gray-400">
          BASIC INFORMATION
        </p>

        <div className="grid grid-cols-[110px_1fr] gap-y-3 mt-4">
          <p className="font-medium">Gender</p>
          <select
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800
                   border border-gray-300 dark:border-slate-700
                   focus:ring-2 focus:ring-primary/50 outline-none"
            value={values.gender}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'gender',
                value: e.target.value,
              })
            }
          >
            <option value="Not Selected">Not Selected</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors?.gender && <ErrorMessage message={errors.gender} />}

          <p className="font-medium">Birthday</p>
          <input
            className="w-full px-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800
                   border border-gray-300 dark:border-slate-700
                   focus:ring-2 focus:ring-primary/50 outline-none"
            type="date"
            value={values.dob}
            onChange={(e) =>
              dispatch({
                type: 'CHANGE_FIELD',
                field: 'dob',
                value: e.target.value,
              })
            }
          />
          {errors?.dob && <ErrorMessage message={errors.dob} />}
        </div>
      </section>

      {/* SAVE BUTTON */}
      <div className="pt-6 text-center">
        <button
          type="submit"
          disabled={isPending}
          className="
        px-10 py-2.5 rounded-full
        font-medium text-slate-200  bg-blue-500
        bg-primary hover:bg-primary/90
        transition
        cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
      "
        >
          {isPending ? 'Updating...' : 'Save information'}
        </button>
      </div>
    </form>
  );
}

export default UpdateProfile;
