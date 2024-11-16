import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, allowedRoles }) => {

    const userRole = Cookies.get("role")
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
export default ProtectedRoute;
