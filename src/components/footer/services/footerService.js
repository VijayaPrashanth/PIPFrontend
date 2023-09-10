/* eslint-disable import/no-anonymous-default-export */
import apiService from "../../helpers/apiService"

export default {
    getVersion: async() =>  {
        const response = await apiService.get('version');
        return response.data;
    }
}