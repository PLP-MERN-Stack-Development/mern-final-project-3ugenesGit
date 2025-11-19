import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { startAuth, setCredentials, authFailed, logout } from '@/features/auth/authSlice';
import { emailLogin, registerUser, web3AuthLogin } from '@/services/authApi';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [web3Loading, setWeb3Loading] = useState(false);

  const login = useCallback(
    async (credentials) => {
      try {
        dispatch(startAuth());
        const data = await emailLogin(credentials);
        dispatch(setCredentials(data));
      } catch (error) {
        dispatch(authFailed(error.response?.data?.message || error.message));
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (payload) => {
      try {
        dispatch(startAuth());
        const data = await registerUser(payload);
        dispatch(setCredentials(data));
      } catch (error) {
        dispatch(authFailed(error.response?.data?.message || error.message));
      }
    },
    [dispatch]
  );

  const web3SignIn = useCallback(
    async (idToken) => {
      setWeb3Loading(true);
      try {
        dispatch(startAuth());
        const data = await web3AuthLogin({ idToken });
        dispatch(setCredentials(data));
      } catch (error) {
        dispatch(authFailed(error.response?.data?.message || error.message));
      } finally {
        setWeb3Loading(false);
      }
    },
    [dispatch]
  );

  const signOut = () => {
    dispatch(logout());
  };

  return { login, register, web3SignIn, signOut, web3Loading };
};

