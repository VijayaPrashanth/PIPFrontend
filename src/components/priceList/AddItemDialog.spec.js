import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddItemDialog from './AddItemDialog';


describe('AddItemDialog component with testid', () => {
    const handleCloseMock = jest.fn();
    it('renders with the correct title', () => {
        render(<AddItemDialog open={true} handleClose={handleCloseMock} />);

        expect(screen.getByTestId('additemstitle')).toBeInTheDocument();
    });

    it('updates state when input fields are changed', () => {
        //const { getByTestId } = render(<AddItemDialog open={true} handleClose={handleCloseMock} />);
        render(<AddItemDialog open={true} handleClose={() => { }} />);

        // eslint-disable-next-line testing-library/prefer-screen-queries
        // const nameInput = getByTestId('namefield');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        // const priceInput = getByTestId('pricefield');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        // const unitInput = getByTestId('unitfield');
        const nameInput = screen.getByTestId('namefield');
        const priceInput = screen.getByTestId('pricefield');
        const unitInput = screen.getByTestId('unitfield');

        // fireEvent.change(nameInput);
        // fireEvent.change(priceInput);
        // fireEvent.change(unitInput);
        fireEvent.change(nameInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '10.99' } });
        fireEvent.change(unitInput, { target: { value: 'pcs' } });

        expect(nameInput.value).toBe('Test Product');
        expect(priceInput.value).toBe('10.99');
        expect(unitInput.value).toBe('pcs');
    });

    it('calls performAdd function when "Add to Inventory" button is clicked', async () => {
        const performAddMock = jest.fn();
        const { getByTestId } = render(
            <AddItemDialog open={true} handleClose={handleCloseMock} performAdd={performAddMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const addButton = getByTestId('addtoinventory');
        fireEvent.click(addButton);

        // Wait for the asynchronous operation to complete
        await waitFor(() => {
            expect(performAddMock).toHaveBeenCalledTimes(1);
        });
    });

    it('closes the dialog when the close button is clicked', () => {
        
        const { getByTestId } = render(
            <AddItemDialog open={true} handleClose={handleCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const closeButton = getByTestId('closeButton');
        fireEvent.click(closeButton);

        expect(handleCloseMock).toHaveBeenCalledTimes(1);
    });
});