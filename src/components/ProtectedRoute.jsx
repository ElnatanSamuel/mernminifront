import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ element: Element, isAuthenticated, user, requireAdmin = false }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Element />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(ProtectedRoute); 