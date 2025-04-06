import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSessionStore = create(
  persist(
    (set) => ({
      activeEmail: null, // Initial state: no active email
      startSession: (email) => set({ activeEmail: email }), // Set the active email
      killSession: () => set({ activeEmail: null }), // Clear the active email
    }),
    { name: 'active-email-store' } // Storage key for localStorage
  )
);

export default useSessionStore;