import { useReducer } from 'react';
import { authReducer, initialState } from '../reducer/authReducer';
import { AuthContext } from './context';
import { useQueryClient } from '@tanstack/react-query';

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', JSON.stringify(userData.token));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const register = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', JSON.stringify(userData.token));
    dispatch({ type: 'REGISTER', payload: userData });
  };

  const updateProfile = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.user));
    dispatch({ type: 'UPDATE_PROFILE', payload: userData });
  };

  const getProfile = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData.user));
    dispatch({ type: 'GET_PROFILE', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login,
        logout,
        register,
        updateProfile,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
