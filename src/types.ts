export type Trip = {
  id: string;
  driver: User;
  vehicle: Vehicle;
  origin: Branch;
  destiny: Branch;
  status: string;
  odometer?: string;
  progress?: string;
  authorizedBy?: string;
  createdAt: string;
  authorizedAt?: string;
  finishedBy?: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  odometer: number;
  branch?: Branch;
  color: string;
  model: string;
  year: number;
  brand: string;
};

export type Branch = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  role: Role;
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

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
