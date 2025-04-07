import { Trip } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
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
          <TableHead>Motorista</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead>Origem</TableHead>
          <TableHead>Destino</TableHead>
          <TableHead className="text-right">Progresso</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip.id}>
            <TableCell className="font-medium">{trip.driver}</TableCell>
            <TableCell className="w-24">
              <Badge variant={mapVariant(trip.status)}>
                {translateStatus(trip.status)}
              </Badge>
            </TableCell>
            <TableCell>{trip.origin}</TableCell>
            <TableCell>{trip.destiny}</TableCell>
            <TableCell className="text-right">{trip.progress}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
