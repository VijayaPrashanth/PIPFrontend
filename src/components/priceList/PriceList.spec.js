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

configure({ adapter: new Adapter() });
jest.mock('axios');

jest.mock("../helpers/apiService",()=>({
      default : {
        add: jest.fn()
      }
}));

describe('checking add functionality in pricelist',()=>{
  const {getByTestId} = render(<PriceList/>);

  when(apiService.add).calledWith({
    id:1,
    name:"onion",
    quantity:3,
    unit:"KG"
  }).mockResolvedValue("");

  // eslint-disable-next-line testing-library/prefer-screen-queries
  fireEvent.click(getByTestId("addButton"));

  const expectedResponse = {
    "id": 1,
    "name": "onion",
    "quantity": 3,
    "unit": "KG"
  }

  expect(apiService.add).toHaveBeenCalledWith(expectedResponse);
});

describe('PriceList Component', () => {
  it('fetches and displays data correctly', async () => {
    const mockData = [
      { id: 1, name: 'onion', price: 40 }
    ];
    axios.get.mockResolvedValue({ data: mockData });

    render(<PriceList />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/inventory');
    });
    //expect(getByText('ACTION')).toBeInTheDocument();
  });
}
);

describe("PriceList Basic rendering", () => {
  const renderPriceList = async () => {
    render(<PriceList />);
    await waitFor(()=>screen.findByTestId('test'));
  };

  it("Should display pricelist text", async () => {
    await renderPriceList();
    expect(screen.getByText("PriceList")).toBeInTheDocument();
  });

  it("Should have pricelist id", async () => {
    await renderPriceList();

    expect(screen.getAllByTestId("pricelist")).toBeTruthy();
  });

  it("should have a add button", () => {
    const pricelist = shallow(<PriceList />);
    const buttonComponent = pricelist.find(Button).filterWhere(button => button.text() === 'add');
    expect(buttonComponent).toBeTruthy();
  })

});

describe("should have correct pricelist",()=>{
  // const renderPriceList = async () => {
  //   render(<PriceList />);
  //   await waitFor(() => screen.findByTestId('test'));
  // };

  it("should have id for each item:",()=>{
       render(<PriceList/>);

      expect(screen.getByTestId("pricetableId")).toBeTruthy();

    // const pricetableIdElements = screen.queryAllByTestId("pricetableId");
    // console.log(pricetableIdElements);
    // expect(pricetableIdElements.length).toBeGreaterThan(0);
  });
});


// Mock the API service to simulate API calls
jest.mock('../helpers/apiService', () => ({
  version: jest.fn().mockResolvedValue({ data: [] }),
  add: jest.fn().mockResolvedValue({}),
}));

describe('PriceList component', () => {
  it('renders the component', () => {
    render(<PriceList />);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('adds an item to the cart', async () => {
    render(<PriceList />);

    const mockResponse = [
      { id: 1, name: 'Item 1', price: 10, unit: 'kg' },
      {id: 2, name: 'Item2', price: 20, unit: 'kg'}
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    await waitFor(() => {
      expect(screen.getByTestId('pricetableAction')).toHaveLength(mockResponse.length);
    });

    const addButton = screen.getAllByText('add')[0];

    const quantityInput = screen.getByLabelText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '5' } });
    fireEvent.click(addButton);

    expect(global.fetch).toHaveBeenCalledWith('cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        name: 'Item 1',
        quantity: 5, 
        unit: 'kg',
      }),
    });

    global.fetch.mockReset();
  });
});


// describe("should redirect to cart page when cart icon is clicked", ()=> {
//   test('clicking cart icon redirects to cart page', () => {
//     render(
//       <Router>
//         <PriceList />
//       </Router>
      
      
//     );
//     const cartPagePath = '/cart';

//     const cartIcon = screen.getByTestId('cart');
//     fireEvent.click(cartIcon);

//     // await waitFor(() => {
//     //   expect(window.location.pathname).toBe(cartPagePath);
//     // });
//       expect(screen.getAllByText('/cart')).toBeInTheDocument();
//   });
// });




describe('should send correct data when add button is clicked', () => {

  jest.mock('../helpers/apiService', () => ({
    add: jest.fn(() => Promise.resolve({
      payload: {
        id: 1,
        name: "onion",
        quantity: 3,
        unit: "KG",
      }
    })),
  }));

  it('should send the correct data when clicking the add button', async () => {

    const { getByText } = render(<PriceList />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const addButton = getByText('add');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(require('../helpers/apiService').add).toHaveBeenCalledWith('cart/add', {
        id: 1,
        name: "onion",
        quantity: 3,
        unit: "KG",
      });
    });
  });
});





