import React from "react";
import { shallow } from "enzyme";
import Layout from "./Layout";
import Header from "../header/Header";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";

const testHandleLogin = jest.fn();
const testHandleLogout = jest.fn();

jest.mock("./hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("Basic rendering", function () {
    it("Should render correctly", () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            handleLogin: testHandleLogin,
            handleLogout: testHandleLogout,
        });
        const layoutComponent = shallow(<Layout />);

        const headerComponent = layoutComponent.find(Header);
        const rootRouterComponent = layoutComponent.find(RootRouter);
        expect(headerComponent.prop("onLogout")).toBe(testHandleLogout);
        expect(headerComponent.prop("isAuthenticated")).toBe(true);
        expect(rootRouterComponent.prop("onLogin")).toBe(testHandleLogin);
        expect(rootRouterComponent.prop("isAuthenticated")).toBe(true);
        expect(rootRouterComponent.prop("isAuthenticated")).toBe(true);
    });
});
