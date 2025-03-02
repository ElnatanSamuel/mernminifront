import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://mernminiback.vercel.app/api',
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (credentials) => {
    console.log('Sending login request:', credentials.username, 'with password');
    try {
      const response = await api.post('/auth/login', credentials, {
        validateStatus: function (status) {
          return status < 500; // Accept all non-server error status codes
        }
      });
      console.log('Login response:', response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Server took too long to respond. Please try again.');
      }
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export const ticketAPI = {
  getTickets: async () => {
    const response = await api.get('/tickets');
    return response;
  },
  
  createTicket: async (ticketData) => {
    const response = await api.post('/tickets', ticketData);
    return response;
  },
  
  updateTicketStatus: async (id, status) => {
    const response = await api.put(`/tickets/${id}`, { status });
    return response;
  }
};

export default api; 