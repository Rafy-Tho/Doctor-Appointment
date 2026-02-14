import { useReducer } from 'react';
import {
  doctorProfileReducer,
  initialState,
} from '../../reducer/doctorProfileReducer';
import { validateAllDoctor } from '../../utils/helper';
import useUpdateDoctorProfile from '../../hooks/doctors/useUpdateDoctorProfile';
import useAuth from '../../hooks/useAuth';

function DoctorUpdateProfile() {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(
    doctorProfileReducer,
    user,
    initialState,
  );
  const { updateDoctorProfile, isPending } = useUpdateDoctorProfile();
  // Handle change field
  const changeFieldHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE_FIELD', payload: { name, value } });
  };

  const changeAvailableHandler = (e) => {
    const { checked, name } = e.target;
    dispatch({
      type: 'CHANGE_FIELD',
      payload: { name, value: checked },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAllDoctor(state.values);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }
    updateDoctorProfile({
      fees: Number(state.values.fees),
      available: state.values.available,
      address: {
        line1: state.values.line1,
        line2: state.values.line2,
      },
    });
  };
  if (!user) return null;
  return (
    <form onSubmit={handleSubmit} className="flex lg:w-4/6 w-full">
      <div className=" border border-slate-100 rounded-lg p-8 py-7 bg-slate-100 w-full dark:bg-slate-800">
        <p className="text-3xl font-medium mb-4">Edit Profile</p>
        <div className="flex flex-col gap-2 ">
          <label htmlFor="fees">Fees</label>
          <input
            type="number"
            value={state.values.fees}
            name="fees"
            onChange={changeFieldHandler}
            className=" border p-2 rounded mb-4"
            id="fees"
          />
          {state?.errors?.fees && (
            <p className="text-red-500 text-sm">{state.errors.fees}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="address1">Address 1</label>
          <input
            type="text"
            value={state.values.line1}
            name="line1"
            onChange={changeFieldHandler}
            className="w-full border p-2 rounded mb-2"
            autoComplete="address-line1"
            id="address1"
          />
          {state?.errors?.line1 && (
            <p className="text-red-500 text-sm">{state.errors.line1}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="address-line2">Address 2</label>
          <input
            type="text"
            value={state.values.line2}
            name="line2"
            onChange={changeFieldHandler}
            autoComplete="address-level2"
            className="w-full border p-2 rounded mb-4"
            id="address2"
          />
          {state?.errors?.line2 && (
            <p className="text-red-500 text-sm">{state.errors.line2}</p>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={state.values.available}
            onChange={changeAvailableHandler}
          />
          <label htmlFor="available">Available</label>
        </div>
        {state?.errors?.available && (
          <p className="text-red-500 text-sm">{state.errors.available}</p>
        )}
        <button
          type="submit"
          className={`
          py-2 rounded text-sm px-4
            ${
              isPending
                ? 'cursor-not-allowed bg-blue-300'
                : 'bg-blue-400 cursor-pointer'
            }
          `}
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

export default DoctorUpdateProfile;
