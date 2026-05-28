import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Language Store
 * Manages application language (English, Kannada, Hindi)
 */
export const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en', // 'en' | 'kn' | 'hi'
      
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
)
