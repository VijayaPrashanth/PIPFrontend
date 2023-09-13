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
import MockAxios from "jest-mock-axios";
import EditItemDialog from "./EditItemDialog";

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

  it("should handled empty inventory",async()=>{
    await render(<PriceList/>);

    await (()=>{
      const empty = screen.getByTestId("emptyInventory");
      expect(empty).toBeTruthy();
      expect(screen.getByText("Will be updating soon.....")).toBeInTheDocument();
    })
  })

  it("should have a delete button", () => {
    const pricelist = shallow(<PriceList />);
    const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'delete');
    expect(buttonComponent).toBeTruthy();
  })

});

describe("enable add and edit dialog:",()=>{
  it("should open dialog when add button is clicked",async()=>{
    const addItemDialog = jest.fn();
    render(
      <>
        <PriceList />
        <AddItemDialog open={false} handleClose={() => { }} />
      </>
    );

    await (()=>{const addItem = screen.getByTestId("additemdialog");
    expect(addItemDialog).toBeInTheDocument();
    const addButton = screen.getByTestId("add_items_Button");
    
    fireEvent.click(addButton);

    expect(addItemDialog).toHaveBeenCalled();})

  })
  it("should open dialog when edit button is clicked",async()=>{
    const mockResponse = [{ id: 1, name: 'Item 1', price: 10, unit: 'kg' }];

    const openEditDialog = jest.fn();
    MockAxios.put.mockResolvedValue(mockResponse);

    render(<PriceList/>)

    await (()=>{const editButton = screen.getByTestId("edit_button");
    fireEvent.click(editButton);
    expect(openEditDialog).toHaveBeenCalledTimes(1);})

  })
    it("should call deleteItemFromInventory",async()=>{
      const mockResponse = [{ id: 1, name: 'Item 1', price: 10, unit: 'kg' }];

      when(pricelistService.deleteItem).calledWith().mockResolvedValueOnce("items removed from inventory");

      render(<PriceList/>);
      await(()=>{const deleteButton = screen.getByTestId("delete");
      expect(deleteButton).toBeInTheDocument();
      fireEvent.click(deleteButton);

      expect(require('./services/pricelistService').deleteItem).toHaveBeenCalledWith(1);})
    })
})

describe("alternate approach",()=>{
    it("should get items from inventory",async()=>{
      const mockItem = [{ id: 1, name: 'Item 1', price: 10, unit: 'kg' }];
      MockAxios.get.mockResolvedValue(mockItem);

      await render(<PriceList/>);
      await (()=>{expect(MockAxios.get).toHaveBeenCalled();})
    })
    it("should open addItemDialog when clicking add button",async()=>{
      const openAddDialog = jest.fn();
      const { getByTestId } = await render(<>
                                              <PriceList />
                                              <AddItemDialog open={true} handleClose={() => { }} />
                                            </>);
        await(()=>{
          const addButton = screen.getByTestId("add_items_Button");
          fireEvent.click(addButton);
          expect(openAddDialog).toHaveBeenCalled();
        })
    })
    it("should open editItemDialog when clicking edit button",async()=>{
      const mockItem = [{ id: 1, name: 'Item 1', price: 10, unit: 'kg' }];
      const openEditDialog = jest.fn();
      const { getByTestId } = await render(<>
                                            <PriceList />
                                            <EditItemDialog open={true} handleClose={() => { }} item={mockItem} />
                                          </>);
      await (() => {
        const editButton = screen.getByTestId("edit_button");
        fireEvent.click(editButton);
        expect(openEditDialog).toHaveBeenCalled();
      })

    })
    it("should delete items from inventory",async()=>{
      MockAxios.delete.mockResolvedValueOnce("items removed from inventory");
      const {getByTestId}=await render(<PriceList/>);

      await(()=>{const deleteButton = getByTestId("delete_button");
      fireEvent.click(deleteButton);
      expect(MockAxios.delete).toHaveBeenCalledTimes(1);})
    })
})

describe("functionality with values",()=>{
  it("should get items from inventory",async()=>{
    const mockItem = [{ id: 1, name: 'Item 1', price: 10, unit: 'kg' }];
    MockAxios.get.mockResolvedValue(mockItem);

    await render(<PriceList />);
    await (() => { 
      expect(MockAxios.get).toHaveBeenCalledWith(mockItem); 
    })
  })

  it("should add items to inventory",async()=>{
    const dataBeforeAdd = [{ id: 1, name: 'onion', price: 40, unit: '1kg' },
                            { id: 2, name: 'tomato', price: 80, unit: '1kg' },
                            { id: 3, name: 'potato', price: 50, unit: '1kg' }]

    const dataAfterAdd = [{ id: 1, name: 'onion', price: 40, unit: '1kg' },
    { id: 2, name: 'tomato', price: 80, unit: '1kg' },
    { id: 3, name: 'potato', price: 50, unit: '1kg' },
      { id: 4, name: 'peas', price: 100, unit: '1kg' }];
    MockAxios.get.mockResolvedValueOnce(dataBeforeAdd);
    MockAxios.get.mockResolvedValueOnce(dataAfterAdd)

    const openAddDialog = jest.fn();
    const { getByTestId } = await render(<>
      <PriceList />
      <AddItemDialog open={true} handleClose={() => { }} />
    </>);
    await(() => {

      const addButton = screen.getByTestId("add_items_Button");
      fireEvent.click(addButton);
      expect(openAddDialog).toHaveBeenCalled();
      expect(MockAxios.get).lastCalledWith(dataAfterAdd);
  })
})

    it("should edit items in inventory", async () => {
      const dataBeforeEdit = [{ id: 1, name: 'onion', price: 40, unit: '1kg' },
      { id: 2, name: 'tomato', price: 80, unit: '1kg' },
      { id: 3, name: 'potato', price: 50, unit: '1kg' }]

      const dataAfterEdit = [{ id: 1, name: 'onion', price: 40, unit: '1kg' },
      { id: 2, name: 'Cabbage', price: 45, unit: '1kg' },
      { id: 3, name: 'potato', price: 50, unit: '1kg' }]

      const item = [{ id: 2, name: 'tomato', price: 80, unit: '1kg' }]
      MockAxios.get.mockResolvedValueOnce(dataBeforeEdit);
      MockAxios.get.mockResolvedValueOnce(dataAfterEdit)

      const openEditDialog = jest.fn();
      const { getByTestId } = await render(<>
        <PriceList />
        <EditItemDialog open={true} handleClose={() => { }} item={item} />
      </>);
      await (() => {

        const editButton = screen.getByTestId("edit_items_Button");
        fireEvent.click(editButton);
        expect(openEditDialog).toHaveBeenCalled();
        expect(MockAxios.get).lastCalledWith(dataAfterEdit);
      })

})
})





