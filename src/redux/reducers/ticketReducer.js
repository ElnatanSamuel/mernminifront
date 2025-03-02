import { 
  FETCH_TICKETS,
  CREATE_TICKET,
  UPDATE_TICKET,
  SET_LOADING,
  SET_ERROR 
} from '../actions/types';

const initialState = {
  tickets: [],
  loading: false,
  error: null
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case CREATE_TICKET:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
        loading: false
      };
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map(ticket => 
          ticket._id === action.payload._id ? action.payload : ticket
        ),
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default ticketReducer; 