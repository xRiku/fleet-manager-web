import { Availability, Vehicle } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mapVariant = (availability: string) => {
  switch (availability) {
    case "available":
      return "success";
    case "unavailable":
      return "destructive";
  }
};
const translateAvailability = (availability: string) => {
  switch (availability) {
    case "available":
      return "Disponível";
    case "unavailable":
      return "Indisponível";
  }
};

export default function VehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fabricante</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Cor</TableHead>
          <TableHead className="w-24">Disponibilidade</TableHead>
          <TableHead>Placa</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Hodômetro</TableHead>
          <TableHead className="text-right">Filial</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.brand}</TableCell>
            <TableCell className="font-medium">{vehicle.model}</TableCell>
            <TableCell className="font-medium">{vehicle.color}</TableCell>
            <TableCell className="w-24">
              <Badge variant={mapVariant(Availability.AVAILABLE)}>
                {translateAvailability(Availability.AVAILABLE)}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{vehicle.plate}</TableCell>
            <TableCell className="font-medium">{vehicle.year}</TableCell>
            <TableCell className="font-medium">{vehicle.odometer}</TableCell>
            <TableCell className="text-right font-medium">
              {vehicle.branch?.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
