import { Status } from "@/types";
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
import ReviewRequestModalTriggerButton from "../buttons/review-request-modal-trigger-button";
import { mapVariant, translateStatus, translateProgress } from "@/lib/utils";
import { getTrips } from "@/lib/server-utils";

export default async function TripsTable() {
  const trips = await getTrips();

  return (
    <Table>
      <TableHeader className="text-lg">
        <TableRow>
          <TableHead className="w-24">Data</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead>Andamento</TableHead>
          <TableHead>Motorista</TableHead>
          <TableHead>Carro</TableHead>
          <TableHead>Origem</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="w-24 font-medium">
              {format(new Date(trip.createdAt), "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="w-24 font-medium">
              <Badge variant={mapVariant(trip.status)}>
                {translateStatus(trip.status)}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">
              {trip.progress && translateProgress(trip.progress)}
            </TableCell>
            <TableCell className="font-medium">{trip.driver.name}</TableCell>
            <TableCell className="font-medium">{`${trip.vehicle.brand} ${trip.vehicle.model} ${trip.vehicle.color} - ${trip.vehicle.plate}`}</TableCell>
            <TableCell className="font-medium">{trip.origin.name}</TableCell>
            <TableCell className="font-medium">{trip.destiny.name}</TableCell>
            <TableCell className="font-medium">
              {trip.status === Status.IN_ANALYSIS && (
                <ReviewRequestModalTriggerButton tripId={trip.id} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
