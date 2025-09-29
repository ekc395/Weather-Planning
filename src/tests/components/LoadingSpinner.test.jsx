// Test file for LoadingSpinner component
// Created by: Ethan Chen

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../../components/LoadingSpinner';

describe('LoadingSpinner', () => {
    test('renders loading spinner', () => {
        render(<LoadingSpinner />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('has correct CSS classes', () => {
        render(<LoadingSpinner />);
        const loadingSpinner = screen.getByRole('img');
        expect(loadingSpinner).toHaveClass('animate-spin');
        expect(loadingSpinner).toHaveClass('rounded-full');
        expect(loadingSpinner).toHaveClass('h-16');
        expect(loadingSpinner).toHaveClass('w-16');
        expect(loadingSpinner).toHaveClass('border-b-2');
        expect(loadingSpinner).toHaveClass('border-primary');
    })
});