import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { Typography } from "@material-ui/core";
import Footer from "./Footer";

 configure({ adapter: new Adapter() });
describe("Basic rendering", () => {
   

  it("Should display version text", () => {
    const footerComponent = shallow(
      <Footer/>
    );
    const typographyComponent = footerComponent.find(Typography);
    const version = typographyComponent.at(0);
    expect(typographyComponent.length).toBe(1);
    expect(version.text()).toBe("Version : v1");
  });

  
});