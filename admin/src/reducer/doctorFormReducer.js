export const initialState = {
  values: {
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    fees: '',
    speciality: 'General physician',
    degree: '',
    address1: '',
    address2: '',
    about: '',
    image: null,
  },
  errors: {},
};
export function doctorFormReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const { name, value } = action.payload;

      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    }

    case 'SET_FILE': {
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

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}
// old reducer function that used to handle blur event
// export function doctorFormReducer(state, action) {
//   switch (action.type) {
//     case 'CHANGE': {
//       const { name, value } = action.payload;

//       return {
//         ...state,
//         values: {
//           ...state.values,
//           [name]: value,
//         },
//       };
//     }

//     case 'BLUR': {
//       const { name, value } = action.payload;
//       const error = doctorFormValidate(name, value);

//       return {
//         ...state,
//         touched: {
//           ...state.touched,
//           [name]: true,
//         },
//         errors: {
//           ...state.errors,
//           [name]: error,
//         },
//       };
//     }

//     case 'SET_FILE': {
//       const { name, value } = action.payload;
//       return {
//         ...state,
//         values: {
//           ...state.values,
//           [name]: value,
//         },
//       };
//     }

//     case 'SET_ERRORS':
//       return {
//         ...state,
//         errors: action.payload,
//         touched: Object.keys(state.values).reduce((acc, key) => {
//           acc[key] = true;
//           return acc;
//         }, {}),
//       };

//     default:
//       return state;
//   }
// }
