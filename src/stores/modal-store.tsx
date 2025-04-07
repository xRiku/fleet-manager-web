import { create } from "zustand";

type States = {
  isBranchModalOpened: boolean;
  isVehicleModalOpened: boolean;
};

type Actions = {
  toggleIsBranchModalOpened: () => void;
  toggleIsVehicleModalOpened: () => void;
};

export const useModalStore = create<States & Actions>((set) => ({
  isBranchModalOpened: false,
  isVehicleModalOpened: false,
  toggleIsBranchModalOpened: () =>
    set((state) => ({ isBranchModalOpened: !state.isBranchModalOpened })),
  toggleIsVehicleModalOpened: () =>
    set((state) => ({ isVehicleModalOpened: !state.isVehicleModalOpened })),
}));
