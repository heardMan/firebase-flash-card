import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/Auth.js';

const ProtectedRoute = ({ children }) => {

    const { authUser } = useAuth();

    if (authUser.auth === null) {
        return <Navigate to='/signIn' />
    }

    return children;

}

export default ProtectedRoute;