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
  signUp: async (email: string, password: string, displayName: string): Promise<AuthResult> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName
      });
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

  signIn: async (email: string, password: string): Promise<AuthResult> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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

  signOut: async (): Promise<AuthResult> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  getCurrentUser: (): AppUser | null => {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName
    };
  },

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
