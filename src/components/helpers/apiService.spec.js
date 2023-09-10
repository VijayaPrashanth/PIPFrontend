/* eslint-disable jest/no-conditional-expect */
import axios from "axios";
import apiService from "./apiService";
import AxiosMockAdapter from "axios-mock-adapter";


const mock = new AxiosMockAdapter(axios);
describe('Api service', () => {

    afterEach(()=> {
        mock.reset();
    });
    
    it("should make a GET request to specified path", async () => {
        const path = "version";
        const responseData = {"CurrentVersion":"v1"};

        mock.onGet(`http://localhost:8080/${path}`).reply(200, responseData);
        const response = await apiService.get('version');

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it("should make a POST request to the specified path", async () => {
        const path = "inventory";
        const responseData = { "id": 1,"name":"onion","quantity":2 };
        const payload = {"id":1,"name":"onion","quantity":2}

        mock.onPost(`http://localhost:8080/${path}`,payload).reply(200, responseData);
        const response = await apiService.post('inventory',payload);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it("should make a PUT request to cart path", async () => {
        const path = "inventory";
        const payload = { "id": 1, "name": "onion", "quantity": 2 }
        mock.onPut(`http://localhost:8080/${path}`,payload).reply(200,payload);

        const response = await apiService.put('inventory',payload);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(payload);
    });

    it("should make a DETELE request to cart path", async () => {
        const path = "cart";
        const id = 1;
        mock.onDelete(`http://localhost:8080/${path}/${id}`).reply(200);

        const response = await apiService.delete('cart',1);

        expect(response.status).toBe(200);
    });
    it('should Update Cart Item By Id', async () => {
        const path = 'cart';
        const id = '1';
        const payload = { quantity: 2};

        mock.onPut(`http://localhost:8080/${path}/${id}`).reply(200, { message: 'Cart item updated' });
        const response = await apiService.updateCartItem(path, id, payload);

        expect(response.status).toBe(200);
        expect(response.data.message).toBe('Cart item updated');
    });

    it('should handle 500 internal server error', async () => {
        mock.onAny().reply(500);
        try {
            await apiService.get('cart');
        } catch (error) {
            expect(error.response.status).toBe(500);
            expect(window.location.assign).toHaveBeenCalledWith('/error');
        }
    });

    it('should handle other errors', async () => {
        mock.onAny().reply(404, { message: 'Not Found' });

        try {
            await apiService.get('inventory');
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

});
