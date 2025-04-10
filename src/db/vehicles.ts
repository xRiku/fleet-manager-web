import { Vehicle } from "@/types";

export const vehicles = [
  {
    id: "1",
    plate: "ABC1D23",
    odometer: 123456,
    branch: "Filial 1",
    color: "Preto",
    model: "Fusca",
    year: "1980",
    manufacturer: "Volkswagen",
    availability: "available",
  },
  {
    id: "2",
    plate: "DEF4G56",
    odometer: 654321,
    branch: "Filial 2",
    color: "Branco",
    model: "Civic",
    year: "2020",
    manufacturer: "Honda",
    availability: "unavailable",
  },
  {
    id: "3",
    plate: "GHI7J89",
    odometer: 987654,
    branch: "Filial 3",
    color: "Vermelho",
    model: "Fusca",
    year: "1980",
    manufacturer: "Volkswagen",
    availability: "available",
  },
] as Vehicle[];
