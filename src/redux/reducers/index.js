import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import ticketReducer from './ticketReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tickets: ticketReducer
});

export default rootReducer; 