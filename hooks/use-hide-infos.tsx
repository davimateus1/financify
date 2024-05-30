import { create } from "zustand";

type HideInfosState = {
  hideInfos: boolean;
  onToggle: () => void;
};

export const useHideInfos = create<HideInfosState>((set) => ({
  hideInfos: false,
  onToggle: () => set((state) => ({ hideInfos: !state.hideInfos })),
}));
