import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Cart from './Cart';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';


configure({ adapter: new Adapter() });


describe("Cart Basic rendering", () => {

    it("Should display Cart text", async () => {
        render(<Cart/>);
        await(()=>expect(screen.getByText("Cart")).toBeInTheDocument());
    });

    it("Should have id", async () => {
        render(<Cart />);
        await(()=> expect(screen.getAllByTestId("pricelist")).toBeTruthy());
    });

    it("Should render a table", async() => {
        await render(<Cart />);
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(()=>expect(screen.getByTestId("table")).toBeTruthy());
    });

    it("should have a add button", async() => {
        const pricelist = shallow(<Cart />);
        const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'delete');
        await (()=>expect(buttonComponent).toBeTruthy());
    });

    it("should have empty cart check",()=>{
        render(<Cart/>);

        expect(screen.getByTestId("empty cart")).toBeTruthy();
    })

});
