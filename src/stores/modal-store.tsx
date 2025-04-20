import { create } from "zustand";

type States = {
  isBranchModalOpened: boolean;
  isVehicleModalOpened: boolean;
  isUserModalOpened: boolean;
  isRequestVehicleModalOpened: boolean;
  isReviewRequestModalOpened: boolean;
  isCompleteTripConfirmationModalOpened: boolean;
};

type Actions = {
  toggleIsBranchModalOpened: () => void;
  toggleIsVehicleModalOpened: () => void;
  toggleIsUserModalOpened: () => void;
  toggleIsRequestVehicleModalOpened: () => void;
  toggleIsReviewRequestModalOpened: () => void;
  toggleIsCompleteTripConfirmationModalOpened: () => void;
};

export const useModalStore = create<States & Actions>((set) => ({
  isBranchModalOpened: false,
  isVehicleModalOpened: false,
  isUserModalOpened: false,
  isRequestVehicleModalOpened: false,
  isReviewRequestModalOpened: false,
  isCompleteTripConfirmationModalOpened: false,

  toggleIsBranchModalOpened: () =>
    set((state) => ({ isBranchModalOpened: !state.isBranchModalOpened })),
  toggleIsVehicleModalOpened: () =>
    set((state) => ({ isVehicleModalOpened: !state.isVehicleModalOpened })),
  toggleIsUserModalOpened: () =>
    set((state) => ({ isUserModalOpened: !state.isUserModalOpened })),
  toggleIsRequestVehicleModalOpened: () =>
    set((state) => ({
      isRequestVehicleModalOpened: !state.isRequestVehicleModalOpened,
    })),
  toggleIsReviewRequestModalOpened: () =>
    set((state) => ({
      isReviewRequestModalOpened: !state.isReviewRequestModalOpened,
    })),
  toggleIsCompleteTripConfirmationModalOpened: () =>
    set((state) => ({
      isCompleteTripConfirmationModalOpened:
        !state.isCompleteTripConfirmationModalOpened,
    })),
}));
