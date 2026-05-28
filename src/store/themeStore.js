import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Theme Store
 * Manages application theme (light, dark, system)
 */
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'system', // 'light' | 'dark' | 'system'
      
      setTheme: (theme) => set({ theme }),
      
      initializeTheme: () => {
        const stored = localStorage.getItem('theme-storage')
        if (stored) {
          const { state } = JSON.parse(stored)
          set({ theme: state.theme })
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
