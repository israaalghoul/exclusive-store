import { create } from 'zustand'

export const useModalStore = create((set) => ({
  open: false,
  handleOpen: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));

