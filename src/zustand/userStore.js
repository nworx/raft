import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      ut:null,
      setUt: (token) => set({ ut: token }),
      setUser: (userEmail) => set({ user: userEmail }),
      clearUser: () => set({ user: null,ut:null }),
    }),
    {
      name: 'user-store', // key in localStorage
    }
  )
);

export default useUserStore;
