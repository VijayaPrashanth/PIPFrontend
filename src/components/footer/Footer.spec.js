import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";

 configure({ adapter: new Adapter() });

describe("Basic rendering", () => {
   

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