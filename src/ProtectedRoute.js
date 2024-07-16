import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user || !user.emailVerified) {
    // Redirect to login page if not authenticated or not verified
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
