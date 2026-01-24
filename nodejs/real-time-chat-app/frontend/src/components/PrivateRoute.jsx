import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If not authenticated → redirect to login
  if (!isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to="/" replace />;
  }

  // Else allow access
  return children;
};

export default PrivateRoute;
