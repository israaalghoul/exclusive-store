import { create } from "zustand";

export const useMenuStore = create((set) => ({
  isMenuOpen: false,
  anchorEl: null,
  openMenu: (anchor) => set({ isMenuOpen: true, anchorEl: anchor }),
  closeMenu: () => set({ isMenuOpen: false, anchorEl: null }),
}));
