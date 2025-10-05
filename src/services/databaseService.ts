// Database service for Firebase Realtime Database
// Created by: Kris Tong, Ethan Chen, Emily Kim

import { 
  ref, 
  push, 
  set, 
  get, 
  remove, 
  onValue, 
  update
} from 'firebase/database';
import { database } from '../config/firebase';
import { Event, NewEventData } from '../types';

interface DatabaseResult {
  success: boolean;
  error?: string;
  eventId?: string;
  events?: Event[];
  profile?: any;
}

export const databaseService = {

  addEvent: async (userId: string, eventData: NewEventData): Promise<DatabaseResult> => {
    try {
      const eventsRef = ref(database, `users/${userId}/events`);
      const newEventRef = push(eventsRef);
      const eventWithId: Event = {
        ...eventData,
        id: newEventRef.key || '',
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await set(newEventRef, eventWithId);
      return { success: true, eventId: newEventRef.key || undefined };
    } catch (error: any) {
      console.error('Error adding event:', error);
      return { success: false, error: error.message };
    }
  },

  updateEvent: async (userId: string, eventId: string, updateData: Partial<NewEventData>): Promise<DatabaseResult> => {
    try {
      const eventRef = ref(database, `users/${userId}/events/${eventId}`);
      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      await update(eventRef, updatedData);
      return { success: true };
    } catch (error: any) {
      console.error('Error updating event:', error);
      return { success: false, error: error.message };
    }
  },

  removeEvent: async (userId: string, eventId: string): Promise<DatabaseResult> => {
    try {
      const eventRef = ref(database, `users/${userId}/events/${eventId}`);
      await remove(eventRef);
      return { success: true };
    } catch (error: any) {
      console.error('Error removing event:', error);
      return { success: false, error: error.message };
    }
  },

  getUserEvents: async (userId: string): Promise<DatabaseResult> => {
    try {
      const eventsRef = ref(database, `users/${userId}/events`);
      const snapshot = await get(eventsRef);
      if (snapshot.exists()) {
        const eventsData = snapshot.val();
        const eventsArray: Event[] = Object.keys(eventsData).map(key => ({
          ...eventsData[key],
          id: key
        }));
        return { success: true, events: eventsArray };
      } else {
        return { success: true, events: [] };
      }
    } catch (error: any) {
      console.error('Error getting user events:', error);
      return { success: false, error: error.message };
    }
  },

  subscribeToUserEvents: (userId: string, callback: (events: Event[]) => void) => {
    const eventsRef = ref(database, `users/${userId}/events`);
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const eventsData = snapshot.val();
        const eventsArray: Event[] = Object.keys(eventsData).map(key => ({
          ...eventsData[key],
          id: key
        }));
        callback(eventsArray);
      } else {
        callback([]);
      }
    }, (error) => {
      console.error('Error in real-time listener:', error);
      callback([]);
    });
    return unsubscribe;
  },

  saveUserProfile: async (userId: string, profileData: any): Promise<DatabaseResult> => {
    try {
      const userRef = ref(database, `users/${userId}/profile`);
      const profile = {
        ...profileData,
        updatedAt: new Date().toISOString()
      };
      await set(userRef, profile);
      return { success: true };
    } catch (error: any) {
      console.error('Error saving user profile:', error);
      return { success: false, error: error.message };
    }
  },

  getUserProfile: async (userId: string): Promise<DatabaseResult> => {
    try {
      const userRef = ref(database, `users/${userId}/profile`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return { success: true, profile: snapshot.val() };
      } else {
        return { success: true, profile: null };
      }
    } catch (error: any) {
      console.error('Error getting user profile:', error);
      return { success: false, error: error.message };
    }
  }
};
