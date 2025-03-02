import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import { Link, Navigate } from 'react-router-dom';
import Input from './common/Input';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    role: 'user'
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.props.signup(this.state);
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
            Create your account
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
                    value={this.state.username}
                    onChange={(e) => this.setState({ username: e.target.value })}
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
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    value={this.state.role}
                    onChange={(e) => this.setState({ role: e.target.value })}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </form>

            <div className="mt-6">
              <Link
                to="/login"
                className="text-center block text-sm text-blue-600 hover:text-blue-500"
              >
                Already have an account? Sign in
              </Link>
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

export default connect(mapStateToProps, { signup })(Signup); 