import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTickets, updateTicketStatus } from '../redux/actions/ticketActions';

class TicketList extends Component {
  componentDidMount() {
    this.props.fetchTickets();
  }

  handleStatusChange = (ticketId, newStatus) => {
    this.props.updateTicketStatus(ticketId, newStatus);
  };

  getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  render() {
    const { tickets, loading, error, isAdmin } = this.props;

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error}
        </div>
      );
    }

    if (!tickets || tickets.length === 0) {
      return (
        <div className="bg-gray-50 text-gray-600 p-8 rounded-md text-center">
          No tickets found.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
            <p className="mt-2 text-gray-600">{ticket.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${this.getStatusColor(ticket.status)}`}>
                {ticket.status.replace('_', ' ')}
              </span>
              {isAdmin && (
                <select
                  value={ticket.status}
                  onChange={(e) => this.handleStatusChange(ticket._id, e.target.value)}
                  className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
  loading: state.tickets.loading,
  error: state.tickets.error,
  isAdmin: state.auth.user?.role === 'admin'
});

export default connect(mapStateToProps, { fetchTickets, updateTicketStatus })(TicketList); 