import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userEmail) => set({ user: userEmail }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store', // key in localStorage
    }
  )
);

export default useUserStore;
