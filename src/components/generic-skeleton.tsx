import { Skeleton } from "./ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";

export function GenericSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="h-5" />
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <Skeleton className="h-28" />
    </div>
  );
}
