type Trip = {
  driver?: string;
  origin?: string;
  destiny?: string;
  status?: string;
  odometer?: string;
  progress?: string;
  authorizedBy?: string;
  createdAt?: string;
  authorizedAt?: string;
  finishedBy?: string;
};

export const trips = [
  {
    driver: "",
    origin: "",
    destiny: "",
    status: "",
    odometer: "",
    progress: "",
    authorizedBy: "",
    createdAt: "",
    authorizedAt: "",
    finishedBy: "",
  },
] as Trip[];
