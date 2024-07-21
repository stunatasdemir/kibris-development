import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin = false }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');

    if (isAdmin) {
        return isAdminAuthenticated ? children : <Navigate to="/admin/login" />;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
