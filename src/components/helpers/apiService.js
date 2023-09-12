import axios from "axios"
import { authHeader } from "./authService";

const promiseWithErrorHandling = (promise) => {
    return promise.catch(err => {
        if (err.response && err.response.status === 500) {
            // noinspection JSCheckFunctionSignatures
            window.location.assign("/error");
        } else {
            throw err;
        }
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: async (path) => {
        return promiseWithErrorHandling(axios.get(`http://localhost:8080/${path}`,authHeader()));
    },
    post: async (path, payload) => {
        return promiseWithErrorHandling(axios.post(`http://localhost:8080/${path}`, payload,authHeader()));
    },
    put: async (path, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}`, payload,authHeader()));
    },
    putWithId: async (path, id, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}/${id}`, payload,authHeader()))
    },
    delete: async (path, id) => {
        return promiseWithErrorHandling(axios.delete(`http://localhost:8080/${path}/${id}`,authHeader()));
    },
    updateCartItem: async (path, id, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}/${id}`, JSON.stringify(payload), {
            headers: {
                Authorization: 'Basic ' + localStorage.getItem("daily_needs"),
                'Content-Type': 'application/json',
            }
        }));
    },

}

