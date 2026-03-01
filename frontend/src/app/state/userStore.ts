import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserData {
  userId: string;
  role: string;
  username: string;
  userEmail: string;
  is_active: boolean;
  permission: string;
}

interface AuthStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
