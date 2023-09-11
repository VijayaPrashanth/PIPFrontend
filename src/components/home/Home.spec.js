/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-query */
import React from "react";
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from "./Home";
import { fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Router } from "react-router-dom";
import apiService from "../helpers/apiService";
import { when } from "jest-when";
import userEvent from "@testing-library/user-event";
import cartService from "../cart/services/cartService";
import pricelistService from "../priceList/services/pricelistService";

configure({ adapter: new Adapter() });
jest.mock('axios');

jest.mock("../cart/services/cartService", () => ({
    __esModule: true,
    default: {
        getItemsFromCart: jest.fn().mockResolvedValue({ data: [] }),
        updateCart: jest.fn().mockResolvedValue({ data: [] })
    }
}));

jest.mock("../priceList/services/pricelistService", () => ({
    __esModule: true,
    default: {
        getItemsFromInventory: jest.fn().mockResolvedValue({ data: [] }),
    }
}));

describe("Home Basic rendering", () => {
    const renderPriceList = async () => {
        render(<Home />);
        await waitFor(() => screen.findByTestId('home'));
    };

    it("Should have name", async () => {
        await renderPriceList();

        expect(screen.findByTestId("name")).toBeTruthy();
    });

    it("Should have price", async () => {
        await renderPriceList();

        expect(screen.findByTestId("price")).toBeTruthy();
    });

    it("Should have unit", async () => {
        await renderPriceList();

        expect(screen.findByTestId("unit")).toBeTruthy();
    });

    it("Should have itemscount", async () => {
        await renderPriceList();

        expect(screen.findByTestId("itemscount")).toBeTruthy();
    });

    it("should have a add button", () => {
        const home = shallow(<Home />);
        const buttonComponent = home.find(Button).filterWhere(button => button.text() === 'add');
        expect(buttonComponent).toBeTruthy();
    })

});

describe("get items from inventory",()=>{
    it("should display items in inventory",async()=>{
        when(pricelistService.getItemsFromInventory).calledWith()
            .mockResolvedValue({id: 1, name: "onion", price: 40, unit: "1KG" });

        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText("onion")).toBeInTheDocument();
            expect(screen.getByText("40")).toBeInTheDocument();
            expect(screen.getByText("1KG")).toBeInTheDocument();
            expect(screen.getByText("3")).toBeInTheDocument();
        })
    })
})

describe("Add items to cart",()=>{
    it("should call cartSerivce when add button is clicked",async()=>{
        const item = {
            id:1,
            name:"onion",
            price:40,
            unit:"1KG"
        }
        const addItem = jest.fn();
        render(<Home/>);
        await waitFor(()=>{
        const addButton = screen.queryByTestId("addButton");
        fireEvent.click(addButton);

        expect(addItem).calledWith(item,3);
    })

    })
})


