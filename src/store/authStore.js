import { create } from 'zustand'

/**
 * Authentication Store
 * Manages user authentication state
 */
export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  
  setUser: (user) => set({ user, loading: false }),
  
  setLoading: (loading) => set({ loading }),
  
  logout: () => set({ user: null, loading: false }),
}))
