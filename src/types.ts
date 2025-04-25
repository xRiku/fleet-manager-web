export type Trip = {
  id: string;
  driver: User;
  vehicle: Vehicle;
  origin: Garage;
  destiny: Garage;
  status: Status;
  progress?: Progress;
  reviewedBy?: string;
  createdAt: string;
  reviewedAt?: string;
  finishedBy?: string;
};

export type Vehicle = {
  id: string;
  plate: string;
  odometer: number;
  garage?: Garage;
  color: string;
  model: string;
  year: number;
  brand: string;
  availability: Availability;
};

export type Garage = {
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
  REJECTED = "rejected",
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

export enum GenericAnswer {
  OK = "ok",
  NOT_OK = "notOk",
  NOT_CHECKED = "notChecked",
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
