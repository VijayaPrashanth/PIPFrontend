import React from "react";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {render,screen } from "@testing-library/react";

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
 it("Should have pricelist in header", async()=> {
    render(
      <Header/>
    );

    await(()=>{const pricelistid = screen.getByTestId("pricelist");
    expect(pricelistid).toBeTruthy();

    const priceText = screen.getByText("PriceList");
    expect(priceText).toBeDefined();})
  });

  it("Should have bill in header", async() => {
     render(
      <Header />
    );

    await(()=>{const billId = screen.getByTestId("bill");
    expect(billId).toBeTruthy();

    const billText = screen.getByText("Bill");
    expect(billText).toBeDefined();})
  });

   it("should have shoppingcarticon", async() => {
     render(<Header />);

     await(()=>{expect(screen.getByTestId("cart_icon")).toBeTruthy();})
   })

});


describe("check whether the correct paths are provided",()=>{
  const renderHeader = async ()=>{
    render(<Header/>);
    await (()=>screen.findByTestId('header'));
  }
  it('should have path to home',async()=>{
    render(<Header />);
    await(()=>{const dailyneeds = screen.getByTestId('dailyneeds_link');
    expect(dailyneeds).toBeInTheDocument();
    expect(dailyneeds.href).toContain('/home');})
  })
  it('should have path to cart', async() => {
    render(<Header />);
    await(()=>{const cart = screen.getByTestId('cart_link');
    expect(cart).toBeInTheDocument();
    expect(cart.href).toContain('/cart');})
  })
  it('should have path to bill', async() => {
    render(<Header />);
    await(()=>{const bill = screen.getByTestId('bill_link');
    expect(bill).toBeInTheDocument();
    expect(bill.href).toContain('/bill');})
  })
  it('should have path to pricelist',async()=>{
    render(<Header/>);
    await(()=>{const pricelist = screen.getByTestId('pricelist_link');
    expect(pricelist).toBeInTheDocument();
    expect(pricelist.href).toContain('/pricelist');})
  })
})
