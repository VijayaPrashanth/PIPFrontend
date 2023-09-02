import axios from "axios"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    version: async (path) => {
        return axios.get(`http://localhost:8080/${path}`);
    }
}

