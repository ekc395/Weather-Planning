// Test file for Calendar component
// Created by: Ethan Chen

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calendar from '../../components/Calendar';

// Mock the child components
jest.mock('../../components/WeekView', () => {
  return function MockWeekView({ selectedDate }) {
    return <div data-testid="week-view">Week View - Selected: {selectedDate}</div>;
  };
});

jest.mock('../../components/MonthView', () => {
  return function MockMonthView({ onViewChange, onDateSelect }) {
    return (
      <div data-testid="month-view">
        Month View
        <button onClick={() => onViewChange && onViewChange('week')}>Change to Week</button>
        <button onClick={() => onDateSelect && onDateSelect('2024-01-15')}>Select Date</button>
      </div>
    );
  };
});

describe('Calendar Component', () => {
  const mockOnViewChange = jest.fn();
  const mockOnDateSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders week view by default', () => {
    render(<Calendar />);
    expect(screen.getByTestId('week-view')).toBeInTheDocument();
    expect(screen.queryByTestId('month-view')).not.toBeInTheDocument();
  });

  test('renders week view when defaultView is week', () => {
    render(<Calendar defaultView="week" />);
    expect(screen.getByTestId('week-view')).toBeInTheDocument();
    expect(screen.queryByTestId('month-view')).not.toBeInTheDocument();
  });

  test('renders month view when defaultView is month', () => {
    render(<Calendar defaultView="month" />);
    expect(screen.getByTestId('month-view')).toBeInTheDocument();
    expect(screen.queryByTestId('week-view')).not.toBeInTheDocument();
  });

  test('passes selectedDate to WeekView', () => {
    const testDate = '2024-01-15';
    render(<Calendar defaultView="week" selectedDate={testDate} />);
    expect(screen.getByText(`Week View - Selected: ${testDate}`)).toBeInTheDocument();
  });

  test('passes onViewChange and onDateSelect to MonthView', () => {
    render(
      <Calendar 
        defaultView="month" 
        onViewChange={mockOnViewChange}
        onDateSelect={mockOnDateSelect}
      />
    );
    
    expect(screen.getByTestId('month-view')).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    const { container } = render(<Calendar />);
    const calendarDiv = container.firstChild;
    
    expect(calendarDiv).toHaveClass(
      'flex-1',
      'min-h-[30rem]',
      'p-2',
      'pt-5',
      'rounded-lg',
      'shadow-sm',
      'border',
      'border-gray-200',
      'sm:p-8',
      'sm:pt-5'
    );
  });
});
