/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { fireEvent, getAllByAltText, getByDisplayValue, getByTestId, render, screen, waitFor } from '@testing-library/react';
import Cart from './Cart';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '@material-ui/core';
import cartService from './services/cartService';
import { when } from 'jest-when';
import MockAxios from 'jest-mock-axios';

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

    it("should have a add button", async() => {
        const pricelist = shallow(<Cart />);
        const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'delete');
        await waitFor(()=>expect(buttonComponent).toBeTruthy());
    });

    it("should have empty cart check",()=>{
        const displayAble=true;
        render(<Cart/>);
        expect(screen.getByTestId("empty cart")).toBeTruthy();
    })

    it("should display empty cart",()=>{
        render(<Cart/>);
        expect(screen.getByText("No items in cart!!!")).toBeInTheDocument();
    })
});

describe("Cart functionalities",()=>{
    const data = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 3, unit: "1KG" }];

    it("should get items from cart:",async()=>{
        when(cartService.getItemsFromCart).calledWith().mockResolvedValue(data);
        MockAxios.get.mockResolvedValueOnce(data);

        const {getByText} = await render(<Cart/>);
        await (()=>{
            expect(getByText("onion")).toBeInTheDocument();
            expect(getByText("40")).toBeInTheDocument();
            expect(getByText("1KG")).toBeInTheDocument();
            expect(getByText("3")).toBeInTheDocument();
            expect(cartService.getItemsFromCart).toHaveBeenCalled();
        })
        
    })
})

describe("test with alternative approach:",()=>{
    const data = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 3, unit: "1KG" }];
    it("should get items from cart",async()=>{

        MockAxios.get.mockResolvedValueOnce(data);

        const {getByText} =await render(<Cart/>);

         await( ()=>{
            expect(MockAxios.get).toHaveBeenCalled(1);
             expect(getByText("onion")).toBeInTheDocument();
             expect(getByText("40")).toBeInTheDocument();
             expect(getByText("1KG")).toBeInTheDocument();
             expect(getByText("3")).toBeInTheDocument();
        })

    })

    it("should delete item from cart",async()=>{
        const dataBeforeDelete = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 4, unit: "1KG" },
            { id: 2, inventory: { id: 2, name: "tomato", price: 80, unit: "1KG" }, name: "tomato", quantity: 2, unit: "1KG" },
            { id: 3, inventory: { id: 3, name: "potato", price: 50, unit: "1KG" }, name: "potato", quantity: 3, unit: "1KG" },
            { id: 4, inventory: { id: 4, name: "peas", price: 100, unit: "1KG" }, name: "peas", quantity: 1, unit: "1KG" }];

        const dataAfterDelete = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 4, unit: "1KG" },
            { id: 2, inventory: { id: 2, name: "tomato", price: 80, unit: "1KG" }, name: "tomato", quantity: 2, unit: "1KG" },
            { id: 4, inventory: { id: 4, name: "peas", price: 100, unit: "1KG" }, name: "peas", quantity: 1, unit: "1KG" }];

        MockAxios.get.mockResolvedValue(dataBeforeDelete);
        MockAxios.delete.mockResolvedValueOnce("item not found");

        await render(<Cart/>);

        await(()=>{
            expect(MockAxios.get).calledWith(dataBeforeDelete);
            const deleteButton = screen.getByTestId("deleteButton");

            fireEvent.click(deleteButton);

            expect(MockAxios.delete(3)).toHaveBeenCalledTimes(1);
            expect(MockAxios.get).calledWith(dataAfterDelete);
        });
    })

    it("should delete all items from cart", async () => {
        const dataBeforeDelete = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 4, unit: "1KG" },
        { id: 2, inventory: { id: 2, name: "tomato", price: 80, unit: "1KG" }, name: "tomato", quantity: 2, unit: "1KG" },
        { id: 3, inventory: { id: 3, name: "potato", price: 50, unit: "1KG" }, name: "potato", quantity: 3, unit: "1KG" },
        { id: 4, inventory: { id: 4, name: "peas", price: 100, unit: "1KG" }, name: "peas", quantity: 1, unit: "1KG" }];

        const dataAfterDelete = [];

        MockAxios.get.mockResolvedValue(dataBeforeDelete);
        MockAxios.delete.mockResolvedValueOnce("item not found");

        await render(<Cart />);

        await (() => {
            expect(MockAxios.get).calledWith(dataBeforeDelete);
            const deleteButton = screen.getByTestId("deleteButton");

            fireEvent.click(deleteButton);
            fireEvent.click(deleteButton);
            fireEvent.click(deleteButton);
            fireEvent.click(deleteButton);

            expect(MockAxios.delete).toHaveBeenCalledTimes(4);
            expect(MockAxios.get).calledWith(dataAfterDelete);
        });
    })

    it("should increment itemscount when + button is clicked",async()=>{
        const incrementData = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 4, unit: "1KG" }];
        MockAxios.get.mockResolvedValue(data);
        MockAxios.put.mockResolvedValue(incrementData);
        const incrementFn = jest.fn();

        await render(<Cart/>);

        await(()=>{
            expect(MockAxios.get).toHaveBeenCalledTimes(1);
            const incrementButton = screen.getByTestId("increment_button");
            fireEvent.click(incrementButton);
            expect(incrementFn).toHaveBeenCalled();
            expect(MockAxios.put).calledWith(incrementData);
            expect(MockAxios.get).calledWith(incrementData);
        })
    })

    it("should decrement itemscount when - button is clicked", async () => {
        const decrementValue = [{ id: 1, inventory: { id: 1, name: "onion", price: 40, unit: "1KG" }, name: "onion", quantity: 2, unit: "1KG" }];
        MockAxios.get.mockResolvedValue(data);
        MockAxios.put.mockResolvedValue(decrementValue);
        const decrementFn = jest.fn();

        await render(<Cart />);
        await (() => {
            expect(MockAxios.get).toHaveBeenCalledTimes(1);
            const decrementButton = screen.getByTestId("decrement_button");
            fireEvent.click(decrementButton);
            expect(decrementFn).toHaveBeenCalled();
            expect(MockAxios.put).calledWith(decrementValue);
            expect(MockAxios.get).calledWith(decrementValue);
        })
    })


})