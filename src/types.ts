export type Trip = {
  id: string;
  driver?: string;
  origin?: string;
  destiny?: string;
  status: string;
  odometer?: string;
  progress?: string;
  authorizedBy?: string;
  createdAt?: string;
  authorizedAt?: string;
  finishedBy?: string;
};

export enum Status {
  APPROVED = "approved",
  DENIED = "denied",
  IN_ANALYSIS = "inAnalysis",
}

export enum Progress {
  IN_PROGRESS = "inProgress",
  DONE = "DONE",
}
