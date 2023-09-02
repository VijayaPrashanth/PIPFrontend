import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";

 configure({ adapter: new Adapter() });

describe("Footer Basic rendering", () => {
   

  it("Should display version", () => {

    render(<Footer/>);
    
    const versionid = screen.getByTestId("version");
    expect(versionid).toBeTruthy();
  });

  it("should display version text",()=>{
    render(<Footer/>);
    expect(screen.getByText("Version :")).toBeInTheDocument();

  })

});



describe("Footer Component", () => {
  jest.mock("../helpers/apiService", () => ({
  version: jest.fn(() =>
    Promise.resolve({
      data: { "CurrentVersion": "v1" }, // Mocked response data
    })
  ),
}));
  it("fetches and displays the version information", async () => {
    render(<Footer />);
    expect(screen.getByTestId("version")).toHaveTextContent("Version :");
  });
});