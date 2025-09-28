// Test file for authService
// Created by: Ethan Chen

import { authService } from '../../services/authService';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updateProfile: jest.fn()
}));

// Mock Firebase config
jest.mock('../../config/firebase', () => ({
  auth: {}
}));

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    test('successfully creates user and updates profile', async () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      const mockUserCredential = { user: mockUser };
      createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      updateProfile.mockResolvedValue();
      const result = await authService.signUp('test@example.com', 'password123', 'Test User');
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password123');
      expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: 'Test User' });
      expect(result).toEqual({ success: true, user: mockUser });
    });

    test('handles signup error', async () => {
      const errorMessage = 'Email already in use';
      createUserWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));
      const result = await authService.signUp('test@example.com', 'password123', 'Test User');
      expect(result).toEqual({ success: false, error: errorMessage });
    });
  });

  describe('signIn', () => {
    test('successfully signs in user', async () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      const mockUserCredential = { user: mockUser };
      signInWithEmailAndPassword.mockResolvedValue(mockUserCredential);
      const result = await authService.signIn('test@example.com', 'password123');
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password123');
      expect(result).toEqual({ success: true, user: mockUser });
    });

    test('handles signin error', async () => {
      const errorMessage = 'Invalid credentials';
      signInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));
      const result = await authService.signIn('test@example.com', 'password123');
      expect(result).toEqual({ success: false, error: errorMessage });
    });
  });

  describe('signOut', () => {
    test('successfully signs out user', async () => {
      signOut.mockResolvedValue();
      const result = await authService.signOut();
      expect(signOut).toHaveBeenCalledWith({});
      expect(result).toEqual({ success: true });
    });

    test('handles signout error', async () => {
      const errorMessage = 'Network error';
      signOut.mockRejectedValue(new Error(errorMessage));
      const result = await authService.signOut();
      expect(result).toEqual({ success: false, error: errorMessage });
    });
  });

  describe('getCurrentUser', () => {
    test('returns current user', () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      const mockAuth = { currentUser: mockUser };
      
      // Mock the auth object
      jest.doMock('../../config/firebase', () => ({
        auth: mockAuth
      }));

      const result = authService.getCurrentUser();
      expect(result).toBe(mockUser);
    });
  });

  describe('onAuthStateChanged', () => {
    test('sets up auth state listener', () => {
      const mockCallback = jest.fn();
      const mockUnsubscribe = jest.fn();
      onAuthStateChanged.mockReturnValue(mockUnsubscribe);
      const result = authService.onAuthStateChanged(mockCallback);
      expect(onAuthStateChanged).toHaveBeenCalledWith({}, mockCallback);
      expect(result).toBe(mockUnsubscribe);
    });
  });
});
