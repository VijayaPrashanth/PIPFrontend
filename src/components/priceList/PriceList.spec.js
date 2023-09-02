import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PriceList from "./PriceList";
import { render, screen } from "@testing-library/react";

 configure({ adapter: new Adapter() });
 
describe("Basic rendering", () => {
   

  it("Should display pricelist text", () => {
   render(<PriceList/>);
    expect(screen.getByText("PriceList")).toBeInTheDocument();
  });

  it("Should have pricelist id",()=>{
    render(<PriceList/>);

    expect(screen.getAllByTestId("pricelist")).toBeTruthy();
  })

  
});