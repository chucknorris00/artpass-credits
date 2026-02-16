import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  profiles: any[] | undefined;
  isLoading: boolean;
}

export const ProfilesTable = ({ profiles, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!profiles?.length) {
    return <p className="text-muted-foreground text-center py-8">No hay perfiles registrados.</p>;
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead className="text-right">Créditos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name ?? "—"}</TableCell>
              <TableCell>{p.email ?? "—"}</TableCell>
              <TableCell>
                {(p as any).membership_plans?.name ? (
                  <Badge variant="secondary">{(p as any).membership_plans.name}</Badge>
                ) : (
                  <span className="text-muted-foreground">Sin plan</span>
                )}
              </TableCell>
              <TableCell className="text-right">{p.available_credits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
