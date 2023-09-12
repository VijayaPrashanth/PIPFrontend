import axios from "axios";

const tokenKey = "daily_needs";
const usernameKey = "username";

export const authHeader = () => {
    if (localStorage.getItem(tokenKey)) {
        return {
            headers: {
                Authorization: 'Basic ' + localStorage.getItem(tokenKey)
            }
        };
    }
    return {
        headers: {}
    };
}

export const login = async (username, password) => {
    const token = authBasic(username, password);
    const config = {
        headers: {
            Authorization: "Basic " + token,
        },
    };
    const response = await axios.get(`http://localhost:8080/login`, config);
    const userDetails = response.data;
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(usernameKey, username);
    return userDetails;
};

export const isLoggedIn = () => {
    return localStorage.getItem(tokenKey) !== null;
};

export const userName = () => {
    return localStorage.getItem(usernameKey);
};

export const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(usernameKey);
    localStorage.clear();
};

const authBasic = (username, password) => {
    return window.btoa(username + ":" + password);
};
