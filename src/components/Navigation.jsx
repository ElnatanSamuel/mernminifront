import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';

class Navigation extends Component {
  render() {
    const { isAuthenticated, user } = this.props;

    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link className="text-white font-bold text-xl" to="/">
              Ticket System
            </Link>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' ? (
                  <Link className="text-gray-300 hover:text-white" to="/admin">
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link className="text-gray-300 hover:text-white" to="/dashboard">
                      Dashboard
                    </Link>
                    <Link className="text-gray-300 hover:text-white" to="/create-ticket">
                      Create Ticket
                    </Link>
                  </>
                )}
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={this.props.logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navigation); 