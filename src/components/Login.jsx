import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { Link, Navigate } from 'react-router-dom';
import Input from './common/Input';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission:', {
      username: this.state.username,
      passwordLength: this.state.password?.length || 0
    });
    await this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    const { isAuthenticated, user } = this.props;
    
    if (isAuthenticated) {
      return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />;
    }

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={this.handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <Input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <Input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              <Link
                to="/signup"
                className="text-center block text-sm text-blue-600 hover:text-blue-500"
              >
                Don't have an account? Sign up
              </Link>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <strong>Admin Demo:</strong>
                    <p>Username: admin12 | Password: 1234</p>
                  </div>
                  <div>
                    <strong>User Demo:</strong>
                    <p>Username: user123 | Password: 1234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { login })(Login); 