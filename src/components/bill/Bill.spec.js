import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { Typography } from "@material-ui/core";
import Bill from "./Bill";

 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should display Bill Details text", () => {
    const billComponent = shallow(
      <Bill/>
    );
    const typographyComponent = billComponent.find(Typography);
    const bill = typographyComponent.at(0);
    expect(typographyComponent.length).toBe(1);
    expect(bill.text()).toBe("Bill Details");
  });

  
});