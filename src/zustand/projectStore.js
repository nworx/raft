// store/useProjectStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProjectStore = create(
  persist(
    (set) => ({
      currentProject: null,
      setCurrentProject: (project) => set({ currentProject: project }),
      clearProject: () => set({ currentProject: null }),
    }),
    {
      name: 'project-store', // Key in localStorage
      // Optional: whitelist only currentProject to persist
      partialize: (state) => ({ currentProject: state.currentProject }),
    }
  )
);

export default useProjectStore;
