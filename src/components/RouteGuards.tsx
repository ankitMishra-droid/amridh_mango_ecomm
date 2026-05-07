import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
}

// Redirects logged-in users away from auth pages (like /login)
export const GuestRoute: React.FC<RouteGuardProps> = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Protects customer-only routes that require login (e.g. /profile)
export const AuthRoute: React.FC<RouteGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

// Protects public customer routes from admins (e.g. /, /shop)
export const CustomerRoute: React.FC<RouteGuardProps> = ({ children }) => {
  const { user } = useAuth();

  if (user && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

// Protects admin-only routes
export const AdminRoute: React.FC<RouteGuardProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/user_admin" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
