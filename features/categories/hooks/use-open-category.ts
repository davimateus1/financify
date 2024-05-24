import { create } from "zustand";

type OpenCategoryState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useOpenCategory = create<OpenCategoryState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
