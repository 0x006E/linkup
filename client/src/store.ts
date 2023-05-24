import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from './api/models/User'

interface AuthState {
    details: User | null
    setDetails: (details: User) => void
    logout: () => void
    checkAuthenticated: boolean
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        details: null,
        setDetails: (details) => set({ details }),
        logout: () => set({ details: null }),
        checkAuthenticated: false,
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)

export default useAuthStore