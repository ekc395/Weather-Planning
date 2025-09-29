// Test file for Footer component
// Created by: Ethan Chen

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../components/Footer';

describe('Footer', () => {
    test('renders copyright text', () => {
        render(<Footer />);
        expect(screen.getByText('© 2025 Weather Planner')).toBeInTheDocument();
    });

    test('uses semantic contentinfo landmark', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toBeInTheDocument();
    });

    test('applies expected Tailwind classes', () => {
        render(<Footer />);
        const footer = screen.getByRole('contentinfo');
        expect(footer).toHaveClass('bottom-0');
        expect(footer).toHaveClass('left-0');
        expect(footer).toHaveClass('right-0');
        expect(footer).toHaveClass('text-center');
        expect(footer).toHaveClass('py-5');
        expect(footer).toHaveClass('text-sm');
    });
});
