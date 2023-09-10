import axios from "axios"

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
        return promiseWithErrorHandling(axios.get(`http://localhost:8080/${path}`));
    },
    post: async (path, payload) => {
        return promiseWithErrorHandling(axios.post(`http://localhost:8080/${path}`, payload));
    },
    put: async (path, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}`, payload));
    },
    putWithId: async (path, id, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}/${id}`, payload))
    },
    delete: async (path, id) => {
        return promiseWithErrorHandling(axios.delete(`http://localhost:8080/${path}/${id}`));
    },
    updateCartItem: async (path, id, payload) => {
        return promiseWithErrorHandling(axios.put(`http://localhost:8080/${path}/${id}`, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json',
            }
        }));
    },

}

