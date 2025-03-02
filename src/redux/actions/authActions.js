import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from './types';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await authAPI.login(credentials);
    if (!response.data.token || !response.data.role) {
      throw new Error('Invalid response from server');
    }
    
    const userData = {
      username: response.data.username,
      role: response.data.role
    };
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userData', JSON.stringify(userData));

    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        token: response.data.token,
        user: userData
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
  localStorage.removeItem('userData');
  dispatch({ type: LOGOUT });
  toast.info('Logged out successfully');
};

// Add this new action to check auth state on refresh
export const checkAuthState = () => dispatch => {
  try {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('userData');
    
    if (token && userDataStr) {
      const userData = JSON.parse(userDataStr);
      if (userData && userData.role) {
        dispatch({
          type: AUTH_SUCCESS,
          payload: { 
            token,
            user: userData
          }
        });
      }
    }
  } catch (error) {
    console.error('Auth state restoration failed:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch({ type: LOGOUT });
  }
}; 