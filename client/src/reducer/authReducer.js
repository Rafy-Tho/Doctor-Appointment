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

    default:
      return state;
  }
}
