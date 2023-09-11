/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Cart from './Cart';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import { wait } from '@testing-library/user-event/dist/utils';
import apiService from '../helpers/apiService';
import cartService from './services/cartService';
import { when } from 'jest-when';


configure({ adapter: new Adapter() });

jest.mock('../cart/services/cartService', () => ({
    getItemsFromCart: jest.fn(() => Promise.resolve({ data: 'success' })),
    deleteItemFromCart: jest.fn(()=> Promise.resolve({data: "item removed from cart"}))
}));
jest.mock('../helpers/apiService',()=>{
    updateCartItem: jest.fn();
});

describe("Cart Basic rendering", () => {

    it("Should display Cart text", async () => {
        render(<Cart/>);
        await (()=>expect(screen.getByText("Cart")).toBeInTheDocument());
    });

    it("Should have id", async () => {
        render(<Cart />);
        await (()=> expect(screen.getByTestId("pricelist")).toBeTruthy());
    });

    it("Should render a table", async() => {
        await render(<Cart />);
        // eslint-disable-next-line testing-library/await-async-utils
        waitFor(()=>expect(screen.getByTestId("table")).toBeTruthy());
    });

    it("should have a add button", async() => {
        const pricelist = shallow(<Cart />);
        const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'delete');
        await waitFor(()=>expect(buttonComponent).toBeTruthy());
    });

    it("should have empty cart check",()=>{
        render(<Cart/>);
        expect(screen.getByTestId("empty cart")).toBeTruthy();
    })

    it("should display empty cart",()=>{
        render(<Cart/>);
        expect(screen.getByText("No items in cart!!!")).toBeInTheDocument();
    })
});

describe("Cart functionalities",()=>{
    it("should get items from cart:",async()=>{
        when(cartService.getItemsFromCart).calledWith()
        .mockResolvedValue([{id:1,inventory:{id:1,name:"onion",price:40,unit:"1KG"},name:"onion",quantity:3,unit:"1KG"}]);

        render(<Cart/>);

        await waitFor(()=>{
            expect(screen.getByText("onion")).toBeInTheDocument();
            expect(screen.getByText("40")).toBeInTheDocument();
            expect(screen.getByText("1KG")).toBeInTheDocument();
            expect(screen.getByText("3")).toBeInTheDocument();
        })
        
    })

    it("should send delete request on clicking delete icon",()=>{
        const deleteFunction = jest.fn();
        when(cartService.deleteItemFromCart).calledWith(2).mockResolvedValueOnce("item removed from cart");

        render(<Cart/>);

        const deleteButton = screen.getByTestId("delete_button");
        fireEvent.click(deleteButton);

        expect(deleteFunction(2)).toBeCalled();
        expect(cartService.deleteItemFromCart).toBeCalled();
    })

    it("should update itemscount",()=>{
        const incrementFn = jest.fn();
        when(apiService.updateCartItem)
            .calledWith('cart',1, 3)
            .mockResolvedValue({
                id: 1, inventory:
                    { id: 1, name: "onion", price: 40, unit: "1KG" },
                name: "onion", quantity: 3, unit: "1KG"
            });

            render(<Cart/>);
            const increment = screen.getByTestId("increment_button");
            fireEvent.click(increment);

            expect(incrementFn).toBeCalled();
    })
})
