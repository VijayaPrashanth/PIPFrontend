import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PriceList from "./PriceList";
import { render, screen, waitFor } from "@testing-library/react";
import { Button} from "@material-ui/core";
import axios from "axios";

 configure({ adapter: new Adapter() });
jest.mock('axios');

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
  });}
  );

describe("PriceList Basic rendering", () => {
  const renderPriceList = async () => {
    render(<PriceList />);
    await waitFor(() => screen.getByTestId('test'));
  };

  it("Should display pricelist text", async() => {
    await renderPriceList();
    expect(screen.getByText("PriceList")).toBeInTheDocument();
  });

  it("Should have pricelist id",async()=>{
    await renderPriceList();

    expect(screen.getAllByTestId("pricelist")).toBeTruthy();
  });

  it("Should render a table",async()=>{
    await renderPriceList();

     expect(screen.getByTestId("table")).toBeTruthy();
  });

  it("should have a add button",()=>{
    const pricelist = shallow(<PriceList/>);
    const buttonComponent = pricelist.find(Button).filterWhere(button=>button.text()==='add');
    expect(buttonComponent).toBeTruthy();
  })
  
  it('renders the component correctly', async() => {
     await renderPriceList();
    expect(screen.getByText('PriceList')).toBeInTheDocument(); // PriceList heading
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('PRICE')).toBeInTheDocument();
    expect(screen.getByText('ACTIONS')).toBeInTheDocument();
  });
});