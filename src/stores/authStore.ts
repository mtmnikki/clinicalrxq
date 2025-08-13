/**
 * Production Authentication Store - Connects to Real API Endpoints
 * Replace your current src/stores/authStore.ts with this file
 */
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  register: (userData: Partial<User>) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  /**
   * Real login function that calls your /api/login endpoint
   */
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Essential for HttpOnly cookies
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login failed:', data.error);
        set({ isLoading: false });
        return false;
      }

      // Success! Create user object from API response
      const user: User = {
        id: data.memberId,
        email: data.email,
        firstName: 'Member', // You can enhance this by fetching from Airtable
        lastName: 'User',
        role: 'member',
        subscription: {
          id: data.memberId,
          planName: 'Premium',
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          programs: [] // You can fetch this from Airtable if needed
        },
        createdAt: new Date()
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
      
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      return false;
    }
  },
  
  /**
   * Check authentication status using your /api/me endpoint
   */
  checkAuth: async () => {
    set({ isLoading: true });
    
    try {
      const response = await fetch('/api/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        
        const user: User = {
          id: data.memberId,
          email: data.email,
          firstName: 'Member',
          lastName: 'User',
          role: 'member',
          subscription: {
            id: data.memberId,
            planName: 'Premium',
            status: 'active',
            startDate: new Date(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            programs: []
          },
          createdAt: new Date()
        };
        
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
  
  /**
   * Logout function that clears the JWT cookie
   */
  logout: async () => {
    try {
      // Call logout endpoint to clear cookie
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
  
  /**
   * Registration function (if you want to add registration)
   */
  register: async (userData: Partial<User>) => {
    set({ isLoading: true });
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });

      set({ isLoading: false });
      return response.ok;
    } catch (error) {
      console.error('Registration error:', error);
      set({ isLoading: false });
      return false;
    }
  }
}));
