import { create } from "zustand";

type OpenAccountState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useOpenAccount = create<OpenAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
