import { Trip } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const mapVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "destructive";
    default:
      return "inAnalysis";
  }
};

const translateStatus = (status: string) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Recusado";
    case "inAnalysis":
      return "Em análise";
  }
};

export default function DriverRequestsTable({
  trips,
}: {
  trips: Trip[] | Omit<Trip, "driver">[];
}) {
  const shouldShowDriver: boolean =
    trips instanceof Array &&
    trips.every((trip): trip is Trip => "driver" in trip);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Data</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead>Progresso</TableHead>
          {shouldShowDriver && <TableHead>Motorista</TableHead>}
          <TableHead>Carro</TableHead>
          <TableHead>Origem</TableHead>
          <TableHead>Destino</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="w-24">
              {format(new Date(trip.createdAt), "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="w-24 font-medium">
              <Badge variant={mapVariant(trip.status)}>
                {translateStatus(trip.status)}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{trip.progress}</TableCell>
            {shouldShowDriver && "driver" in trip && (
              <TableCell className="font-medium">{trip.driver.name}</TableCell>
            )}
            <TableCell className="font-medium">{`${trip.vehicle.brand} ${trip.vehicle.model} ${trip.vehicle.color} - ${trip.vehicle.plate}`}</TableCell>
            <TableCell className="font-medium">{trip.origin.name}</TableCell>
            <TableCell className="font-medium">{trip.destiny.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
