import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = sessionStorage.getItem("userToken");
    setIsAuthenticated(!!token);
  };

  const logout = () => {
    sessionStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const useAuth = () => {
  return useContext(AuthContext);
};