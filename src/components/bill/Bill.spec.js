import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Bill from "./Bill";
import { render, screen } from "@testing-library/react";

 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should have Bill id", () => {
    render(<Bill/>);
    expect(screen.getByTestId("bill")).toBeTruthy();
  });

  it("Should display Bill Details Text",()=> {
    render(<Bill />);
    expect(screen.getByText("Bill Details")).toBeInTheDocument();
  })
  
});