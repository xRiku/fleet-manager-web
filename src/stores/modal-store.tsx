import { create } from "zustand";

type States = {
  isBranchModalOpened: boolean;
  isVehicleModalOpened: boolean;
  isUserModalOpened: boolean;
};

type Actions = {
  toggleIsBranchModalOpened: () => void;
  toggleIsVehicleModalOpened: () => void;
  toggleIsUserModalOpened: () => void;
};

export const useModalStore = create<States & Actions>((set) => ({
  isBranchModalOpened: false,
  isVehicleModalOpened: false,
  isUserModalOpened: false,
  toggleIsBranchModalOpened: () =>
    set((state) => ({ isBranchModalOpened: !state.isBranchModalOpened })),
  toggleIsVehicleModalOpened: () =>
    set((state) => ({ isVehicleModalOpened: !state.isVehicleModalOpened })),
  toggleIsUserModalOpened: () =>
    set((state) => ({ isUserModalOpened: !state.isUserModalOpened })),
}));
