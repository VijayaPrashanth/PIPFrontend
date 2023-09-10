import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditItemDialog from './EditItemDialog';

jest.mock('../helpers/apiService', () => ({
    add: jest.fn().mockResolvedValue({ data: 'Success' }),
}));

const mockItem = {
    id: 1,
    name: 'Item Name',
    price: 10.00,
    unit: 'kg',
};

describe('EditItemDialog Component', () => {
    const handleClose = jest.fn();

    test('renders with initial values', () => {
        render(<EditItemDialog open handleClose={handleClose} item={mockItem} />);

        expect(screen.getByTestId('productnamefield')).toHaveValue(mockItem.name);
        expect(screen.getByTestId('pricefield')).toHaveValue(mockItem.price);
        expect(screen.getByTestId('unitfield')).toHaveValue(mockItem.unit);
    });

    test('handles input changes', () => {
        render(<EditItemDialog open handleClose={handleClose} item={mockItem} />);

        fireEvent.change(screen.getByTestId('productnamefield'), {
            target: { value: 'Updated Name' },
        });
        fireEvent.change(screen.getByTestId('pricefield'), {
            target: { value: '15.99' },
        });
        fireEvent.change(screen.getByTestId('unitfield'), {
            target: { value: 'lbs' },
        });

        expect(screen.getByTestId('productnamefield')).toHaveValue('Updated Name');
        expect(screen.getByTestId('pricefield')).toHaveValue('15.99');
        expect(screen.getByTestId('unitfield')).toHaveValue('lbs');
    });

    test('performs edit and closes the dialog', async () => {
        render(<EditItemDialog open={true} handleClose={handleClose} item={mockItem} />);

        fireEvent.click(screen.getByText('Done'));

        //await screen.findByText('response for added items');

        expect(require('../helpers/apiService').add).toHaveBeenCalledWith('inventory/add', {
            id: 1,
            name: 'Item Name',
            price: 10.99,
            unit: 'kg',
        });

        //expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
