// Authentication service for Firebase Auth
// Created by: Kris Tong, Ethan Chen, Emily Kim

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthResult, User as AppUser } from '../types';

export const authService = {
  // Sign up new user
  signUp: async (email: string, password: string, displayName: string): Promise<AuthResult> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name
      await updateProfile(user, {
        displayName: displayName
      });
      
      // Convert Firebase User to our AppUser type
      const appUser: AppUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
      
      return { success: true, user: appUser };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Sign in existing user
  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Convert Firebase User to our AppUser type
      const appUser: AppUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      };
      
      return { success: true, user: appUser };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Sign out current user
  signOut: async (): Promise<AuthResult> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: (): AppUser | null => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName
    };
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback: (user: AppUser | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }
      
      const appUser: AppUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName
      };
      
      callback(appUser);
    });
  }
};
