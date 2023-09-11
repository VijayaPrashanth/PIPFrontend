/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddItemDialog from './AddItemDialog';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Close } from '@material-ui/icons';
import userEvent from '@testing-library/user-event';
import user from '@testing-library/user-event';
configure({ adapter: new Adapter() });


jest.mock("./services/pricelistService", () => ({
    addItemToInventory: jest.fn(() => Promise.resolve({ data: {} })),
}));


describe("AddItemDialog Component Basic Rendering", () => {
    it("should have all needed elements", () => {
        const handleClose = jest.fn();
        render(
            <AddItemDialog open={true} handleClose={handleClose} />
        );

        expect(screen.getByTestId("dialog")).toBeInTheDocument();
        expect(screen.getByTestId("additemstitle")).toHaveTextContent("Add Items");
        expect(screen.getByTestId("close_button")).toBeTruthy();
        expect(screen.getByTestId("namelabel")).toHaveTextContent("Product Name");
        expect(screen.getByTestId("namefield")).toBeTruthy();
        expect(screen.getByTestId("pricelabel")).toHaveTextContent("Price");
        expect(screen.getByTestId("pricefield")).toBeTruthy();
        expect(screen.getByTestId("unitlabel")).toHaveTextContent("Unit");
        expect(screen.getByTestId("unitfield")).toBeTruthy();
        expect(screen.getByTestId("addtoinventory")).toBeInTheDocument();
    });

    it("handles input changes correctly", () => {
        const handleClose = jest.fn();
        render(<AddItemDialog open={true} handleClose={handleClose} />);

        const nameInput = screen.getByTestId("namefield").querySelector("input");
        const priceInput = screen.getByTestId("pricefield").querySelector("input");
        const unitInput = screen.getByTestId("unitfield").querySelector("input");

        fireEvent.change(nameInput, { target: { value: "Test Product" } });
        fireEvent.change(priceInput, { target: { value: "10.99" } });
        fireEvent.change(unitInput, { target: { value: "pcs" } });

        expect(nameInput.value).toBe("Test Product");
        expect(priceInput.value).toBe("10.99");
        expect(unitInput.value).toBe("pcs");
    });
});

describe("close Button",()=>{
    it("should perform handleclose when close icon is clicked",()=>{
        const handleCloseMock = jest.fn();

        render(<AddItemDialog open={true} handleClose={handleCloseMock} />)

        const closeIcon = screen.getByTestId("close_button");
        fireEvent.click(closeIcon);

        expect(handleCloseMock).toHaveBeenCalled(1);
    })
})

describe("addtoinventory button",()=> {
    it("should call performAdd when addtoinventory button is clicked",async()=>{
        const performAdd = jest.fn();

        render(
            <AddItemDialog open={true} handleClose={() => { }} />
        );

            const addToInventoryButton = screen.getByTestId('addtoinventory_button');
            // eslint-disable-next-line testing-library/no-wait-for-side-effects
            user.click(addToInventoryButton);

            //await new Promise((resolve) => setTimeout(resolve, 0));

            await waitFor(()=>{
                expect(performAdd).toHaveBeenCalled();
            })
    })
})