import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from './types';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await authAPI.login(credentials);
    if (!response.data.token || !response.data.role) {
      throw new Error('Invalid response from server');
    }
    
    // Store both token and user data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
      username: response.data.username,
      role: response.data.role
    }));

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

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
  toast.info('Logged out successfully');
};

// Add this new action to check auth state on refresh
export const checkAuthState = () => dispatch => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (token && user) {
    dispatch({
      type: AUTH_SUCCESS,
      payload: { token, user }
    });
  }
}; 