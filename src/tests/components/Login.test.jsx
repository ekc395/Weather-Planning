import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../../components/Login';

describe('Login', () => {
    test('renders login component', () => {
        render(<Login />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});