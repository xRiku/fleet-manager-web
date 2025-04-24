import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getVehicles } from "@/lib/server-utils";

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

export default async function VehiclesTable() {
  const vehicles = await getVehicles();

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead className="w-24 ">Disponibilidade</TableHead>
          <TableHead>Placa</TableHead>
          <TableHead>Fabricante</TableHead>
          <TableHead>Modelo</TableHead>
          <TableHead>Cor</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Hodômetro</TableHead>
          <TableHead className="text-right">Garagem</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id} className="font-medium">
            <TableCell className="w-24">
              <Badge variant={mapVariant(vehicle.availability)}>
                {translateAvailability(vehicle.availability)}
              </Badge>
            </TableCell>
            <TableCell>{vehicle.plate}</TableCell>
            <TableCell>{vehicle.brand}</TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.color}</TableCell>
            <TableCell>{vehicle.year}</TableCell>
            <TableCell>{vehicle.odometer}</TableCell>
            <TableCell className="text-right">
              {vehicle.garage?.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
