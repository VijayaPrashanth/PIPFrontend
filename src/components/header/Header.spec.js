import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { render,screen } from "@testing-library/react";

import Header from "./Header";

 configure({ adapter: new Adapter() });

 describe("Header component Basic rendering", () => {
   
  it("Should display Daily Needs in header", () => {
   render(
      <Header/>
    );
    const headerid = screen.getByTestId("dailyneeds");
    expect(headerid).toBeTruthy();
    const dailyneeds = screen.getByText("Daily Needs");
    expect(dailyneeds).toBeTruthy();
  });
 it("Should have pricelist in header", ()=> {
    render(
      <Header/>
    );

    const pricelistid = screen.getByTestId("pricelist");
    expect(pricelistid).toBeTruthy();

    const priceText = screen.getByText("PriceList");
    expect(priceText).toBeDefined();
  });

  it("Should have bill in header", () => {
     render(
      <Header />
    );

    const billId = screen.getByTestId("bill");
    expect(billId).toBeTruthy();

    const billText = screen.getByText("Bill");
    expect(billText).toBeDefined();
  });

});

describe("should have shopping cart icon",()=>{
  it("should have shoppingcarticon",()=>{
    render(<Header/>);

    expect(screen.getByTestId("cart")).toBeTruthy();
  })
});
