import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTickets } from '../redux/actions/ticketActions';
import TicketList from './TicketList';
import CreateTicket from './CreateTicket';

class UserDashboard extends Component {
  componentDidMount() {
    this.props.fetchTickets();
  }

  render() {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TicketList />
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <CreateTicket />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchTickets })(UserDashboard); 