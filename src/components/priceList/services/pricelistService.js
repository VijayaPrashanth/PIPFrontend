import apiService from "../../helpers/apiService"

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getItemsFromInventory: async () => {
        return await apiService.get('inventory');
    },
    addItemToInventory: async (payload) => {
        return await apiService.post('inventory', payload);
    },
    updateItemInInventory: async (id, payload) => {
        return await apiService.putWithId('inventory', id, payload);
    },
    deleteItem: async (id) => {
        return await apiService.delete('inventory', id);
    }
}