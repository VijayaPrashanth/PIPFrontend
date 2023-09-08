import axios from "axios"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    version: async (path) => {
        return axios.get(`http://localhost:8080/${path}`);
    },
    add: async(path,payload)=>{
        return axios.put(`http://localhost:8080/${path}`, payload);
    },
    getCart: async (path) => {
        return axios.get(`http://localhost:8080/${path}`);
    },
    deleteItem: async(path,id)=> {
        return axios.delete(`http://localhost:8080/${path}/${id}`);
    }
}

