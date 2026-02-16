import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  classes: any[] | undefined;
  isLoading: boolean;
  showStudio?: boolean;
}

export const ClassesTable = ({ classes, isLoading, showStudio = true }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!classes?.length) {
    return <p className="text-muted-foreground text-center py-8">No hay clases registradas.</p>;
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Clase</TableHead>
            {showStudio && <TableHead>Estudio</TableHead>}
            <TableHead>Horario</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className="text-right">Cupo</TableHead>
            <TableHead className="text-right">Créditos</TableHead>
            <TableHead>Instructor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.name}</TableCell>
              {showStudio && (
                <TableCell>{(c as any).studios?.name ?? "—"}</TableCell>
              )}
              <TableCell className="text-sm">{c.schedule}</TableCell>
              <TableCell>
                {c.art_category ? (
                  <Badge variant="outline">{c.art_category}</Badge>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell className="text-right">{c.max_capacity}</TableCell>
              <TableCell className="text-right">{c.credit_cost}</TableCell>
              <TableCell>{c.instructor_name ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
