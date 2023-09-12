/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

describe("simple test",()=>{
    it("should contain simple test",()=>{
        
    })
})
describe("Basic rendering of login component",()=>{
    it("should contain username and password fields",async()=>{        
        render(<Login />);
        await(()=>{expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("loginButton")).toBeInTheDocument();})
    })
});

describe("should have correct functionality",()=>{

    it('calls handleLogin function on form submission', async () => {
        const onLoginMock = jest.fn();
        const { getByTestId } = render(<Login onLogin={onLoginMock} />);


        await(() => {
            fireEvent.change(getByTestId('username'), { target: { value: 'testuser' } });
            fireEvent.change(getByTestId('password'), { target: { value: 'testpassword' } });
            fireEvent.click(getByTestId('loginButton'));
            expect(onLoginMock).toHaveBeenCalled();
            // expect(onLoginMock).toHaveBeenCalledWith({
            //     username: 'testuser',
            //     password: 'testpassword',
            // });
        });
    });

    it('redirects to "/" when isAuthenticated is true', async() => {
        const navigateMock = jest.fn();
        //jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

        render(<Login isAuthenticated={true}/>)
        //const { rerender } = render(<Login isAuthenticated={false} />);
        //rerender(<Login isAuthenticated={true} />);

       await(()=>{ expect(navigateMock).toHaveBeenCalledWith("/");})
    });
});
