import axios from "axios";
import apiService from "./apiService";
import AxiosMockAdapter from "axios-mock-adapter";


const mock = new AxiosMockAdapter(axios);
describe('Api service', () => {

    afterEach(()=> {
        mock.reset();
    });
    
    it("should make a GET request to the specified path", async () => {
        const path = "version";
        const responseData = {"CurrentVersion":"v1"};

        mock.onGet(`http://localhost:8080/${path}`).reply(200, responseData);

        const response = await apiService.version('version');

        expect(response.status).toBe(200);
        expect(response.data).toEqual(responseData);
    });


});
