/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Basic rendering of login component",()=>{
    it("should contain username and password fields",async()=>{  
        const onLoginMock = jest.fn();      
        render(
            <MemoryRouter>
                <Routes>
                    <Route exact path="/login" element={<Login onLogin={onLoginMock} isAuthenticated={false} />}/>
                </Routes>
            </MemoryRouter>
            
        );
        await(()=>{expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("loginButton")).toBeInTheDocument();})
    })
});

describe("should have correct functionality",()=>{

    it('calls handleLogin function on form submission', async () => {
        const onLoginMock = jest.fn();
        const { getByTestId } = render(
            <MemoryRouter>
                <Routes>
                    <Route exact path="/login" element={<Login onLogin={onLoginMock} isAuthenticated={false} />} />
                </Routes>
            </MemoryRouter>
        );


        await(() => {
            fireEvent.change(getByTestId('username'), { target: { value: 'testuser' } });
            fireEvent.change(getByTestId('password'), { target: { value: 'testpassword' } });
            fireEvent.click(getByTestId('loginButton'));
            expect(onLoginMock).toHaveBeenCalled();
            expect(onLoginMock).toHaveBeenCalledWith({
                username: 'testuser',
                password: 'testpassword',
            });
        });
    });

    it('redirects to "/" when isAuthenticated is true', async() => {
        const navigateMock = jest.fn();
        const onLoginMock = jest.fn();

        render(
        <MemoryRouter>
            <Routes>
                <Route exact path="/login" element={<Login onLogin={onLoginMock} isAuthenticated={false} />} />
            </Routes>
        </MemoryRouter>)

       await(()=>{ 
        expect(navigateMock).toHaveBeenCalledWith("/");
    })
    });
});
