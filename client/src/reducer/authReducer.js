export const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
};
export function authReducer(state, action) {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
      };

    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: action.payload,
      };

    case 'GET_PROFILE':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
