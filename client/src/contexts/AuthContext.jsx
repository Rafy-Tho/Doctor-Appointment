import { useReducer } from 'react';
import { authReducer, initAuth, initialState } from '../reducer/authReducer';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, initAuth);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('token', JSON.stringify(user.token));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
