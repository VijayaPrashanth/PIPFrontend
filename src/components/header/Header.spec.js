import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { Typography } from "@material-ui/core";
import Header from "./Header";

 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should display Daily Needs in header", () => {
    const headerComponent = shallow(
      <Header/>
    );
    const typographyComponent = headerComponent.find(Typography);
    const dailyNeeds = typographyComponent.at(0);
    expect(typographyComponent.length).toBe(3);
    expect(dailyNeeds.text()).toBe("Daily Needs");
  });


  it("Should have pricelist bill in header", ()=> {
    const headerComponent = shallow(
      <Header/>
    );

    const typographyComponent = headerComponent.find(Typography);
    const priceList = typographyComponent.at(1);
    const bill = typographyComponent.at(2);
    expect(typographyComponent.length).toBe(3);
    expect(priceList.text()).toBe("PriceList");
    expect(bill.text()).toBe("Bill");
  });

  
});