import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
// noinspection ES6CheckImport
import { MemoryRouter, Redirect, Route, Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { logout } from "../helpers/authService";

jest.mock("../helpers/authService", () => ({
    isLoggedIn: jest.fn(),
    logout: jest.fn(),
}));
describe("simple test", () => {
    it("should contain simple test", () => {

    })
})
describe("ProtectedRoute Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

it("should render the element when user is authenticated", async() => {

    jest.spyOn(React, "useContext").mockReturnValue({ isAuthenticated: true });

    const elementToRender = <div data-testid="element">Hello, World!</div>;

    const { getByTestId } = render(
        <MemoryRouter initialEntries={["/"]}>
            <Route path="/" element={elementToRender}>
                <ProtectedRoute isAuthenticated={true} />
            </Route>
        </MemoryRouter>
    );

    await(()=>{
        const renderedElement = getByTestId("element");
        expect(renderedElement).toBeInTheDocument();
    })
});

it("should redirect to /login and call logout when user is not authenticated", async() => {

    jest.spyOn(React, "useContext").mockReturnValue({ isAuthenticated: false });

    const { getByTestId } = render(
        <Router>
            <Route path="/login">
                <div data-testid="login-page">Login Page</div>
            </Route>
            <ProtectedRoute element={<div data-testid="element">Hello, World!</div>} isAuthenticated={false} />
        </Router>
    );


    await(()=>{expect(logout).toHaveBeenCalled();
    const loginPage =getByTestId("login-page");
    expect(loginPage).toBeInTheDocument();})
});
});
