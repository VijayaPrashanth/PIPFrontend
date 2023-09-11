import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act, fireEvent, render,screen, waitFor } from "@testing-library/react";

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

   it("should have shoppingcarticon", () => {
     render(<Header />);

     expect(screen.getByTestId("cart_icon")).toBeTruthy();
   })

});


describe("check whether the correct paths are provided",()=>{
  const renderHeader = async ()=>{
    render(<Header/>);
    await (()=>screen.findByTestId('header'));
  }
  it('should have path to home',()=>{
    render(<Header />);
    const dailyneeds = screen.getByTestId('dailyneeds_link');
    expect(dailyneeds).toBeInTheDocument();
    expect(dailyneeds.href).toContain('/home');
  })
  it('should have path to cart', () => {
    render(<Header />);
    const cart = screen.getByTestId('cart_link');
    expect(cart).toBeInTheDocument();
    expect(cart.href).toContain('/cart');
  })
  it('should have path to bill', () => {
    render(<Header />);
    const bill = screen.getByTestId('bill_link');
    expect(bill).toBeInTheDocument();
    expect(bill.href).toContain('/bill');
  })
  it('should have path to pricelist',()=>{
    render(<Header/>);
    const pricelist = screen.getByTestId('pricelist_link');
    expect(pricelist).toBeInTheDocument();
    expect(pricelist.href).toContain('/pricelist');
  })
})
