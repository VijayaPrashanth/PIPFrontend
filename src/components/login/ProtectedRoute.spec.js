import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";
// noinspection ES6CheckImport
import { MemoryRouter, Redirect, Route, Router, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { isLoggedIn, logout } from "../helpers/authService";
import Login from "./Login";
import Home from "../home/Home";
import Cart from "../cart/Cart";

jest.mock("../helpers/authService", () => ({
    isLoggedIn: jest.fn(),
    logout: jest.fn(),
}));

describe("ProtectedRoute Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

it("should render the element when user is authenticated", async() => {
    render(
        <MemoryRouter>
            <Routes>
                <Route exact path="/cart" element={<ProtectedRoute element={<Cart isAuthenticated={true}/>} isAuthenticated={true} />} />
            </Routes>
        </MemoryRouter>
    );

    await(()=>{
        expect(isLoggedIn).toBe(true);
    })
});

it("should redirect to /login and call logout when user is not authenticated", async() => {
    render(
        <MemoryRouter>
            <Routes>
                <Route path="/home" element={<ProtectedRoute element={<Home isAuthenticated={false}/>} isAuthenticated={false} />}>
                </Route>
            </Routes>
        </MemoryRouter>
    );

    await(()=>{
        expect(logout).toHaveBeenCalled();
    })
});
});