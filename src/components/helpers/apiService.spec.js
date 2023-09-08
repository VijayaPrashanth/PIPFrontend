import axios from "axios";
import apiService from "./apiService";
import AxiosMockAdapter from "axios-mock-adapter";


const mock = new AxiosMockAdapter(axios);
describe('Api service', () => {

    afterEach(()=> {
        mock.reset();
    });
    
    it("should make a GET request to version path", async () => {
        const path = "version";
        const responseData = {"CurrentVersion":"v1"};

        mock.onGet(`http://localhost:8080/${path}`).reply(200, responseData);

        const response = await apiService.version('version');

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it("should make a POST request to the specified path", async () => {
        const path = "cart/add";
        const responseData = { "id": 1,"name":"onion","quantity":2 };

        const payload = {"id":1,"name":"onion","quantity":2}
        mock.onPut(`http://localhost:8080/${path}`,payload).reply(200, responseData);

        const response = await apiService.add('cart/add',payload);

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });

    it("should make a GET request to cart path", async () => {
        const path = "cart";
        mock.onGet(`http://localhost:8080/${path}`).reply(200);

        const response = await apiService.getCart('cart');

        expect(response.status).toBe(200);
    });

    it("should make a DETELE request to cart path", async () => {
        const path = "cart";
        const id = 1;
        mock.onDelete(`http://localhost:8080/${path}/${id}`).reply(200);

        const response = await apiService.deleteItem('cart',1);

        expect(response.status).toBe(200);
    });


});
