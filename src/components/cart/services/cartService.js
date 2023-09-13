import apiService from "../../helpers/apiService"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getItemsFromCart: async () => {
        return await apiService.get('cart');
    },
    updateCart: async (payload) => {
        return await apiService.put('cart', payload);
    },
    deleteItemFromCart: async (id) => {
        return await apiService.delete('cart', id);
    },

}