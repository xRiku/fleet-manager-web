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
import { translateProgress } from "@/lib/utils";
import { TripWithRelations } from "@/db/schema";

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
  trips: TripWithRelations[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead className="w-24">Data</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead>Andamento</TableHead>
          <TableHead>Carro</TableHead>
          <TableHead>Origem</TableHead>
          <TableHead>Destino</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id} className="font-medium">
            <TableCell className="w-24">
              {format(new Date(trip.createdAt), "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="w-24">
              <Badge variant={mapVariant(trip.status)}>
                {translateStatus(trip.status)}
              </Badge>
            </TableCell>
            <TableCell>
              {trip.progress ? translateProgress(trip.progress) : undefined}
            </TableCell>
            <TableCell>{`${trip.vehicle?.brand} ${trip.vehicle?.model} ${trip.vehicle?.color} - ${trip.vehicle?.plate}`}</TableCell>
            <TableCell>{trip.origin?.name}</TableCell>
            <TableCell>{trip.destiny?.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
