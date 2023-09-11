/* eslint-disable testing-library/await-async-query */
import React from "react";
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PriceList from "./PriceList";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Router } from "react-router-dom";
import apiService from "../helpers/apiService";
import { when } from "jest-when";
import pricelistService from "./services/pricelistService";
import AddItemDialog from "./AddItemDialog";

configure({ adapter: new Adapter() });
jest.mock('axios');

jest.mock("./services/pricelistService", () => ({
  __esModule: true,
  default: {
    getItemsFromInventory: jest.fn().mockResolvedValue({ data: [] }),
    deleteItem: jest.fn().mockResolvedValue("item removed from inventory"),
  }
}));

describe("PriceList Basic rendering", () => {
  const renderPriceList = async () => {
    render(<PriceList />);
  };

  it("Should have additem button", async () => {
    await renderPriceList();
    expect(screen.findByTestId("additemsbutton")).toBeTruthy();
  });

  it("Should have pricelist id", async () => {
    await renderPriceList();

    expect(screen.findByTestId("id")).toBeTruthy();
  });
  it("Should have item price", async () => {
    await renderPriceList();

    expect(screen.findByTestId("price")).toBeTruthy();
  });
  it("Should have item unit", async () => {
    await renderPriceList();

    expect(screen.findByTestId("unit")).toBeTruthy();
  });

  it("should have a edit button", () => {
    const pricelist = shallow(<PriceList />);
    const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'edit');
    expect(buttonComponent).toBeTruthy();
  })

  it("should handled empty inventory",()=>{
    render(<PriceList/>);

    const empty = screen.getByTestId("emptyInventory");
    expect(empty).toBeTruthy();
    expect(screen.getByText("Will be updating soon.....")).toBeInTheDocument();
  })
  it("should have a delete button", () => {
    const pricelist = shallow(<PriceList />);
    const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'delete');
    expect(buttonComponent).toBeTruthy();
  })

});

describe("enable add and edit dialog:",()=>{
  it("should open dialog when add button is clicked",()=>{
    render(
      <>
        <PriceList />
        <AddItemDialog open={false} handleClose={() => { }} />
      </>
    );

    const addItemDialog = screen.getByTestId("additemdialog")
    expect(addItemDialog).toBeInTheDocument();
    expect(addItemDialog).not.toBeInTheDocument();
    const addButton = screen.getByTestId("add_items_Button");
    
    fireEvent.click(addButton);

    expect(addItemDialog).toBeInTheDocument();
    expect(addItemDialog).toHaveClass('MuiDialog-open');

  })
  it("should open dialog when edit button is clicked",()=>{

  })
    it("should call deleteItemFromInventory",()=>{
      const mockResponse = [{ id: 1, name: 'Item 1', price: 10, unit: 'kg' }];

      //require('./services/pricelistService').getItemsFromInventory.mockResolvedValueOnce({ data: mockResponse });

      // const deleteItem = jest.fn()
      render(<PriceList/>);
      const deleteButton = screen.getByTestId("delete");
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);

      expect(require('./services/pricelistService').deleteItem).toHaveBeenCalledWith(1);
    })
})






