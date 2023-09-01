import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Bill from "./bill/Bill"

import { Typography } from "@material-ui/core";


 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should display pricelist text", () => {
    const billComponent = shallow(
      <Bill/>
    );
    const typographyComponent = billComponent.find(Typography);
    const bill = typographyComponent.at(0);
    expect(typographyComponent.length).toBe(1);
    expect(bill.text()).toBe("Bill Details");
  });

  
});