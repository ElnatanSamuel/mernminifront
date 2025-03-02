import { FETCH_TICKETS, CREATE_TICKET, UPDATE_TICKET, SET_LOADING, SET_ERROR } from './types';
import { ticketAPI } from '../../services/api';
import { toast } from 'react-toastify';

export const setLoading = () => ({ type: SET_LOADING });
export const setError = (error) => ({ type: SET_ERROR, payload: error });

export const fetchTickets = (filters = {}) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await ticketAPI.getTickets(filters);
    dispatch({
      type: FETCH_TICKETS,
      payload: response.data
    });
  } catch (error) {
    dispatch(setError(error.message));
    toast.error('Failed to fetch tickets');
  }
};

export const createTicket = (ticketData) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await ticketAPI.createTicket(ticketData);
    dispatch({
      type: CREATE_TICKET,
      payload: response.data
    });
    toast.success('Ticket created successfully');
  } catch (error) {
    dispatch(setError(error.message));
    toast.error('Failed to create ticket');
  }
};

export const updateTicketStatus = (id, status) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await ticketAPI.updateTicketStatus(id, status);
    dispatch({
      type: UPDATE_TICKET,
      payload: response.data
    });
    toast.success('Ticket status updated');
  } catch (error) {
    dispatch(setError(error.message));
    toast.error('Failed to update ticket status');
  }
}; 