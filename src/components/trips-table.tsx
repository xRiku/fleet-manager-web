import { Trip } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const mapVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "success";
    case "denied":
      return "destructive";
    default:
      return "inAnalysis";
  }
};

const translateStatus = (status: string) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "denied":
      return "Recusado";
    case "inAnalysis":
      return "Em análise";
  }
};

export default function TripsTable({ trips }: { trips: Trip[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Status</TableHead>
          <TableHead>Motorista</TableHead>
          <TableHead>Carro</TableHead>
          <TableHead>Origem</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead className="text-right">Progresso</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="w-24 font-medium">
              <Badge variant={mapVariant(trip.status)}>
                {translateStatus(trip.status)}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{trip.driver.name}</TableCell>
            <TableCell className="font-medium">{`${trip.vehicle.brand} ${trip.vehicle.model} ${trip.vehicle.color} - ${trip.vehicle.plate}`}</TableCell>
            <TableCell className="font-medium">{trip.origin.name}</TableCell>
            <TableCell className="font-medium">{trip.destiny.name}</TableCell>
            <TableCell className="text-right font-medium">
              {trip.progress}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
