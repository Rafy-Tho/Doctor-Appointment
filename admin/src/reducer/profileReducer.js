export const initialState = (user) => ({
  values: {
    name: user?.name ?? '',
    phone: user?.phone ?? '',

    address: {
      line1: user?.address?.line1 ?? '',
      line2: user?.address?.line2 ?? '',
    },
    gender: user?.gender ?? 'Not Selected',
    dob: user?.dob ?? '',
  },
  errors: {},
});

export function profileReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };

    case 'CHANGE_ADDRESS':
      return {
        ...state,
        values: {
          ...state.values,
          address: {
            ...state.values.address,
            [action.field]: action.value,
          },
        },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    case 'RESET_FORM':
      return initialState({});

    default:
      return state;
  }
}
