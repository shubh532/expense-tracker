import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import ExpenseForm from "../ExpenseComponents/ExpenseForm"

// Mock the axios.post function
jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe('ExpenseForm', () => {
  it('should submit expense data when "Add Expense" button is clicked', async () => {
    // Mock the axios.post implementation
    axios.post.mockResolvedValueOnce({ status: 200, data: { name: '1' } });

    render(<ExpenseForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Discrption'), { target: { value: 'Test expense' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Food' } });

    // Submit the form
    fireEvent.click(screen.getByText('Add Expense'));

    // Verify that the axios.post function was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      'https://expensetracker-data-default-rtdb.firebaseio.com/test.json',
      {
        Amount: '100',
        Discription: 'Test expense',
        Category: 'Food',
        Date: '2022-01-01',
      }
    );

    // You can also wait for the asynchronous actions to complete and assert other expected behavior
    // For example, you can check if the loader is displayed or if the dispatched action is called
  });
});
