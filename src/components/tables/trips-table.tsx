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
      <TableHeader>
        <TableRow className="text-lg">
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
          <ReviewRequestModalTriggerButton key={trip.id} tripId={trip.id}>
            <TableRow className="font-medium hover:bg-gray-100">
              <TableCell className="w-24">
                {format(new Date(trip.createdAt), "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="w-24">
                <Badge variant={mapVariant(trip.status)}>
                  {translateStatus(trip.status)}
                </Badge>
              </TableCell>
              <TableCell>
                {trip.progress && translateProgress(trip.progress)}
              </TableCell>
              <TableCell>{trip.driver.name}</TableCell>
              <TableCell>{`${trip.vehicle.brand} ${trip.vehicle.model} ${trip.vehicle.color} - ${trip.vehicle.plate}`}</TableCell>
              <TableCell>{trip.origin.name}</TableCell>
              <TableCell>{trip.destiny.name}</TableCell>
            </TableRow>
          </ReviewRequestModalTriggerButton>
        ))}
      </TableBody>
    </Table>
  );
}
