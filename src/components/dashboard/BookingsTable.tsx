import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const statusColors: Record<string, string> = {
  booked: "bg-primary/10 text-primary border-primary/20",
  attended: "bg-secondary text-secondary-foreground",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

interface Props {
  bookings: any[] | undefined;
  isLoading: boolean;
  showStudio?: boolean;
}

export const BookingsTable = ({ bookings, isLoading, showStudio = true }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!bookings?.length) {
    return <p className="text-muted-foreground text-center py-8">No hay reservas registradas.</p>;
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Clase</TableHead>
            {showStudio && <TableHead>Estudio</TableHead>}
            <TableHead>Usuario</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Créditos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="text-sm">
                {format(new Date(b.booked_at), "dd/MM/yyyy HH:mm")}
              </TableCell>
              <TableCell className="font-medium">
                {b.classes?.name ?? "—"}
              </TableCell>
              {showStudio && (
                <TableCell>{b.classes?.studios?.name ?? "—"}</TableCell>
              )}
              <TableCell className="text-sm font-mono">{b.user_id.slice(0, 8)}…</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[b.status] ?? ""}>
                  {b.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{b.credits_used}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
