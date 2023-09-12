// noinspection ES6CheckImport
import { Navigate } from "react-router-dom";
import React from "react";
import { isLoggedIn, logout } from "../helpers/authService";

const ProtectedRoute = ({ element,isAuthenticated }) => {

    if(!isLoggedIn() && !isAuthenticated) {
        console.log(isLoggedIn);
        console.log(isAuthenticated);
        logout();
        return <Navigate to="/login" replace/>
    }
    else{
        console.log("on success:");
        console.log(isLoggedIn());
        console.log(isAuthenticated);
    }
    return element;
};

export default ProtectedRoute;
