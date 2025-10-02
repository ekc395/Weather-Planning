// Events context for the app with Firebase integration.
// Created by: Kris Tong, Ethan Chen, Emily Kim

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { databaseService } from '../services/databaseService';
import { Event, NewEventData, EventsContextType } from '../types';

const EventsContext = createContext<EventsContextType | undefined>(undefined);

// Helper function to create a local date from a date string
const createLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
};

interface EventsProviderProps {
  children: ReactNode;
}

export function EventsProvider({ children }: EventsProviderProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Set up real-time listener for user events
  useEffect(() => {
    if (!user) {
      setEvents([]);
      return;
    }

    setLoading(true);
    
    // Subscribe to real-time updates
    const unsubscribe = databaseService.subscribeToUserEvents(user.uid, (userEvents) => {
      setEvents(userEvents);
      setLoading(false);
    });

    // Cleanup subscription on unmount or user change
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const addEvent = async (eventData: NewEventData): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      setError('User must be authenticated to add events');
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    const result = await databaseService.addEvent(user.uid, eventData);
    
    if (!result.success) {
      setError(result.error || 'Failed to add event');
    }
    
    setLoading(false);
    return result;
  };

  const updateEvent = async (eventId: string, updateData: Partial<NewEventData>): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      setError('User must be authenticated to update events');
      return { success: false, error: 'User not authenticated' };
    }

    setLoading(true);
    setError(null);

    const result = await databaseService.updateEvent(user.uid, eventId, updateData);
    
    if (!result.success) {
      setError(result.error || 'Failed to update event');
    }
    
    setLoading(false);
    return result;
  };

  const deleteEvent = async (eventId: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) {
      setError('User must be authenticated to remove events');
      return { success: false, error: 'User not authenticated' };
    }

    if (!eventId) {
      throw new Error('Event ID is required for removal');
    }

    setLoading(true);
    setError(null);

    const result = await databaseService.removeEvent(user.uid, eventId);
    
    if (!result.success) {
      setError(result.error || 'Failed to remove event');
    }
    
    setLoading(false);
    return result;
  };

  const getEventsByDateRange = (startDate: string, endDate: string): Event[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return events.filter(event => {
      const eventDate = createLocalDate(event.date);
      return eventDate >= start && eventDate <= end;
    });
  };

  const clearError = (): void => {
    setError(null);
  };

  const value: EventsContextType = {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDateRange,
    clearError
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextType {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
