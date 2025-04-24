import { create } from "zustand";

type States = {
  isGarageModalOpened: boolean;
  isVehicleModalOpened: boolean;
  isUserModalOpened: boolean;
  isRequestVehicleModalOpened: boolean;
  isReviewRequestModalOpened: boolean;
  isCompleteTripConfirmationModalOpened: boolean;
};

type Actions = {
  toggleIsGarageModalOpened: () => void;
  toggleIsVehicleModalOpened: () => void;
  toggleIsUserModalOpened: () => void;
  toggleIsRequestVehicleModalOpened: () => void;
  toggleIsReviewRequestModalOpened: () => void;
  toggleIsCompleteTripConfirmationModalOpened: () => void;
};

export const useModalStore = create<States & Actions>((set) => ({
  isGarageModalOpened: false,
  isVehicleModalOpened: false,
  isUserModalOpened: false,
  isRequestVehicleModalOpened: false,
  isReviewRequestModalOpened: false,
  isCompleteTripConfirmationModalOpened: false,

  toggleIsGarageModalOpened: () =>
    set((state) => ({ isGarageModalOpened: !state.isGarageModalOpened })),
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
