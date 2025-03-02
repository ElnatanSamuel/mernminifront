import { AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from '../actions/types';

const token = localStorage.getItem('token');
const userDataStr = localStorage.getItem('userData');
let userData = null;

try {
  if (userDataStr) {
    userData = JSON.parse(userDataStr);
  }
} catch (error) {
  console.error('Failed to parse user data:', error);
}

const initialState = {
  token: token,
  isAuthenticated: !!token && !!userData,
  user: userData,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        error: null
      };
    case AUTH_FAIL:
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer; 