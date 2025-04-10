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

export type Vehicle = {
  id: string;
  plate: string;
  odometer: number;
  branch: string;
  color: string;
  model: string;
  year: string;
  manufacturer: string;
  availability: string;
}

export type Branch = {
  id: string;
  name: string;
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

export enum Availability {
  AVAILABLE = "available",
  UNAVAILABLE = "unavailable",
}
