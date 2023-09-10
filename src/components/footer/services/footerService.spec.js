import { when } from "jest-when";
import apiService from "../../helpers/apiService";
import footerService from "./footerService";

jest.mock("../../helpers/apiService");

describe("Getting Current Version:",()=>{
    it("should return current version of the application",async()=>{
        const response = {data : { "CurrentVersion": "v1" }};
        when(apiService.get).calledWith('version').mockResolvedValue(response);
        const version = await footerService.getVersion();
        expect( version ).toEqual(response.data);
    });
});