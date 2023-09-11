import { render, screen } from "@testing-library/react";
import Login from "./login";

describe("Basic rendering of login component",()=>{
    it("should contain username and password fields",()=>{        
        render(<Login />);
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("loginButton")).toBeInTheDocument();
    })
})