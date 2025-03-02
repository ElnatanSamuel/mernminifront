import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTicket } from '../redux/actions/ticketActions';

class CreateTicket extends Component {
  state = {
    title: '',
    description: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    
    await this.props.createTicket({ title, description });
    this.setState({ title: '', description: '' });
  };

  render() {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Ticket</h2>
        <form onSubmit={this.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter ticket title"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter ticket description"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Ticket
          </button>
        </form>
      </div>
    );
  }
}

export default connect(null, { createTicket })(CreateTicket); 