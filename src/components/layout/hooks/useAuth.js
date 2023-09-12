/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from "react";
import {
    isLoggedIn,
    login,
    logout,
    userName,
} from "../../helpers/authService";



export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState();

    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
        setUsername(userName());
    }, []);

    const handleLogin = async (username, password) => {
        const userDetails = await login(username, password);
        setIsAuthenticated(true);
        setUsername(userDetails.username);
        return userDetails;
        
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        username: username,
    };
};
