import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from "./Header";
import { Typography } from "@material-ui/core";

 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should display Daily Needs in header", () => {
    const headerComponent = shallow(
      <Header/>
    );
    const typographyComponent = headerComponent.find(Typography);
    expect(typographyComponent.length).toBe(1);
    expect(typographyComponent.text()).toBe("Daily Needs");
  });


  it("Should have pricelist bill in header", ()=> {
    const headerComponent = shallow(
      <Header/>
    );
    const typographyComponent = headerComponent.find(Typography);
    expect(typographyComponent.length).toBe(1);
    expect(typographyComponent.text()).toBe("Daily Needs");
  });

  it("header", ()=> {
    const headerComponent = shallow(
      <Header/>
    );
    const typographyComponent = headerComponent.find(Typography);
    expect(typographyComponent.length).toBe(1);
    expect(typographyComponent.text()).toBe("Daily Needs");
  });
});