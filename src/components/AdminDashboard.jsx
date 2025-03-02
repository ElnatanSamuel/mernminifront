import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTickets, updateTicketStatus } from '../redux/actions/ticketActions';

class AdminDashboard extends Component {
  state = {
    filterStatus: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  };

  componentDidMount() {
    this.props.fetchTickets();
  }

  filterAndSortTickets = () => {
    const { tickets } = this.props;
    const { filterStatus, sortBy, sortOrder } = this.state;

    let filteredTickets = [...tickets];

    // Apply status filter
    if (filterStatus !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === filterStatus);
    }

    // Apply sorting
    filteredTickets.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'createdAt') {
        comparison = new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      } else if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      }
      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filteredTickets;
  };

  handleFilterChange = (e) => {
    this.setState({ filterStatus: e.target.value });
  };

  handleSortChange = (e) => {
    this.setState({ sortBy: e.target.value });
  };

  toggleSortOrder = () => {
    this.setState(prev => ({ 
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
    }));
  };

  getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  handleStatusChange = (id, status) => {
    this.props.updateTicketStatus(id, status);
  };

  render() {
    const { tickets = [], loading } = this.props;
    const filteredTickets = this.filterAndSortTickets();

    const ticketStats = {
      open: tickets.filter(t => t.status === 'open').length || 0,
      inProgress: tickets.filter(t => t.status === 'in_progress').length || 0,
      closed: tickets.filter(t => t.status === 'closed').length || 0
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Open Tickets</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{ticketStats.open}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">In Progress</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">{ticketStats.inProgress}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Closed Tickets</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{ticketStats.closed}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={this.state.filterStatus}
              onChange={this.handleFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={this.state.sortBy}
              onChange={this.handleSortChange}
            >
              <option value="createdAt">Created Date</option>
              <option value="status">Status</option>
              <option value="title">Title</option>
            </select>
            
            <button 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={this.toggleSortOrder}
            >
              {this.state.sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map(ticket => (
                <div key={ticket._id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                  <p className="mt-2 text-gray-600">{ticket.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${this.getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <select
                      value={ticket.status}
                      onChange={(e) => this.handleStatusChange(ticket._id, e.target.value)}
                      className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
  loading: state.tickets.loading
});

export default connect(mapStateToProps, { fetchTickets, updateTicketStatus })(AdminDashboard); 