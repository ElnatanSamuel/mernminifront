import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from './types';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await authAPI.login({ username, password });
    if (!response.data.token || !response.data.role) {
      throw new Error('Invalid response from server');
    }
    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        token: response.data.token,
        user: { 
          username: response.data.username,
          role: response.data.role 
        }
      }
    });
    toast.success('Login successful!');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    dispatch({
      type: AUTH_FAIL,
      payload: errorMessage
    });
    toast.error(errorMessage);
  }
};

export const signup = (userData) => async (dispatch) => {
  try {
    const response = await authAPI.signup(userData);
    if (!response.data.token || !response.data.role) {
      throw new Error('Invalid response from server');
    }
    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        token: response.data.token,
        user: { 
          username: response.data.username,
          role: response.data.role 
        }
      }
    });
    toast.success('Signup successful!');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Signup failed';
    dispatch({
      type: AUTH_FAIL,
      payload: errorMessage
    });
    toast.error(errorMessage);
  }
};

export const logout = () => {
  toast.info('Logged out successfully');
  return { type: LOGOUT };
}; 