import {create} from "zustand";

export const useNavbarStore = create((set) => ({
  hideIcons: false,
  setHideIcons: (value) => set({ hideIcons: value }),
}));

export default useNavbarStore;
