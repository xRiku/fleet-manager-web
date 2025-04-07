import { create } from "zustand";

type States = {
  isBranchModalOpened: boolean;
};

type Actions = {
  toggleIsBranchModalOpened: () => void;
};

export const useModalStore = create<States & Actions>((set) => ({
  isBranchModalOpened: false,
  toggleIsBranchModalOpened: () =>
    set((state) => ({ isBranchModalOpened: !state.isBranchModalOpened })),
}));
