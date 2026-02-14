export const initialState = (user) => ({
  values: {
    fees: user?.fees ?? '',
    available: user?.available ?? false,
    line1: user?.address?.line1 ?? '',
    line2: user?.address?.line2 ?? '',
  },
  errors: {},
});

export function doctorProfileReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const { name, value } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    }
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
}
