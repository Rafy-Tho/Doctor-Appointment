export const initialState = {
  user: null,
  token: null,
};
export function authReducer(state, action) {
  switch (action.type) {
    case 'RESTORE_AUTH':
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
export function initAuth() {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (storedUser && token) {
    return {
      user: JSON.parse(storedUser),
      token: JSON.parse(token),
    };
  }

  return {
    user: null,
    token: null,
  };
}
