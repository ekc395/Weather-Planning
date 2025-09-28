// Test file for Alert component
// Created by: Ethan Chen

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '../../components/Alert';

describe('Alert Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders alert with message', () => {
    render(<Alert message="Test message" onClose={mockOnClose} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('renders success alert with correct styling', () => {
    render(<Alert message="Success!" type="success" onClose={mockOnClose} />);
    const alertContainer = screen.getByText('Success!').closest('div');
    expect(alertContainer).toHaveClass('bg-green-50', 'border-green-200');
  });

  test('renders error alert with correct styling', () => {
    render(<Alert message="Error!" type="error" onClose={mockOnClose} />);
    const alertContainer = screen.getByText('Error!').closest('div');
    expect(alertContainer).toHaveClass('bg-red-50', 'border-red-200');
  });

  test('calls onClose when close button is clicked', () => {
    render(<Alert message="Test message" onClose={mockOnClose} />);
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders confirm dialog when showConfirm is true', () => {
    render(
      <Alert 
        message="Confirm action?" 
        showConfirm={true} 
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  test('calls onConfirm when confirm button is clicked', () => {
    render(
      <Alert 
        message="Confirm action?" 
        showConfirm={true} 
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onCancel when cancel button is clicked', () => {
    render(
      <Alert 
        message="Confirm action?" 
        showConfirm={true} 
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('renders OK button when showConfirm is false', () => {
    render(<Alert message="Test message" onClose={mockOnClose} />);
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
  });
});
