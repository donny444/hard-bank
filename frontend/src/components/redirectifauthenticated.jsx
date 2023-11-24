import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from './auth';

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if(isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

RedirectIfAuthenticated.propTypes = {
  children: PropTypes.node
};

export default RedirectIfAuthenticated;