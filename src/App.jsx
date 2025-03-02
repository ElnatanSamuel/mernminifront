import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { connect } from 'react-redux';
import { checkAuthState } from './redux/actions/authActions';

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import CreateTicket from './components/CreateTicket';
import Navigation from './components/Navigation';
import Notifications from './components/Notifications';
import Signup from './components/Signup';

// Separate connected component for auth state management
class AppContent extends Component {
  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    return (
      <Router>
        <Notifications />
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute 
              element={({ user }) => 
                <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
              } 
            />
          } />
          
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={UserDashboard} />} 
          />
          
          <Route 
            path="/admin" 
            element={<ProtectedRoute element={AdminDashboard} requireAdmin={true} />} 
          />
          
          <Route 
            path="/create-ticket" 
            element={<ProtectedRoute element={CreateTicket} />} 
          />
        </Routes>
      </Router>
    );
  }
}

const ConnectedAppContent = connect(null, { checkAuthState })(AppContent);

// Main App component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedAppContent />
      </Provider>
    );
  }
}

export default App;
