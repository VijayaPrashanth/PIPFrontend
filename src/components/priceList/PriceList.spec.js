import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { Typography } from "@material-ui/core";
import PriceList from "./PriceList";

 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should display pricelist text", () => {
    const priceListComponent = shallow(
      <PriceList/>
    );
    const typographyComponent = priceListComponent.find(Typography);
    const pricelist = typographyComponent.at(0);
    expect(typographyComponent.length).toBe(1);
    expect(pricelist.text()).toBe("PriceList");
  });

  
});