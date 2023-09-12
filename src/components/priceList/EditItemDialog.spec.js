import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditItemDialog from './EditItemDialog';
import pricelistService from './services/pricelistService';
import cartService from '../cart/services/cartService';

jest.mock('./services/pricelistService', () => ({
    updateItemInInventory: jest.fn(() => Promise.resolve({ data: 'success' })),
}));
jest.mock('../cart/services/cartService', () => ({
    deleteItemFromCartByInventory: jest.fn(() => Promise.resolve('deleted')),
}));

const mockItem = {
    id: 1,
    name: 'Item Name',
    price: 10.00,
    unit: 'kg',
};

describe('EditItemDialog Component', () => {

    it("should have all needed elements", () => {
        const handleClose = jest.fn();
        render(
            <EditItemDialog open={true} handleClose={handleClose} item={mockItem}/>
        );

        expect(screen.getByTestId("editdialog")).toBeInTheDocument();
        expect(screen.getByTestId("close_button")).toBeTruthy();
        expect(screen.getByTestId("productnamelabel")).toBeTruthy();
        expect(screen.getByTestId("productnamefield")).toBeTruthy();
        expect(screen.getByTestId("pricelabel")).toBeTruthy();
        expect(screen.getByTestId("pricefield")).toBeTruthy();
        expect(screen.getByTestId("unitlabel")).toBeTruthy();
        expect(screen.getByTestId("unitfield")).toBeTruthy();
        expect(screen.getByTestId("done_button")).toBeInTheDocument();
    });

    it('renders with initial values', async() => {
        const handleClose = jest.fn();
        render(<EditItemDialog open={true} handleClose={handleClose} item={mockItem} />);

       await(()=>{ expect(screen.getByTestId('productnamefield')).toHaveValue(mockItem.name);
        expect(screen.getByTestId('pricefield')).toHaveValue(mockItem.price);
        expect(screen.getByTestId('unitfield')).toHaveValue(mockItem.unit);})
    });

    it("should close dialog on clicking close icon",async()=>{
        const handleClose = jest.fn();
        render(<EditItemDialog open={true} handleClose={handleClose} item={mockItem} />);

        await(()=>{const closeIcon = screen.getByTestId("close_button");
        fireEvent.click(closeIcon);

        expect(handleClose).toHaveBeenCalledTimes(1);})
    })

    it("should call performEdit on clicking done button",async()=>{
        const performEdit = jest.fn();
        const handleClose = jest.fn();
        render(<EditItemDialog open={true} handleClose={handleClose} item={mockItem} />);

        await(()=>{const doneButton = screen.getByTestId("done_button");
        fireEvent.click(doneButton);

        expect(performEdit).toHaveBeenCalledTimes(1);})
    })

});


