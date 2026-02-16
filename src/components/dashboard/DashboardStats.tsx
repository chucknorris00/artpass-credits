import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, GraduationCap, CalendarCheck, Users } from "lucide-react";

interface Props {
  studiosCount: number;
  classesCount: number;
  bookingsCount: number;
  profilesCount: number;
}

const stats = (p: Props) => [
  { label: "Estudios", value: p.studiosCount, icon: Building2 },
  { label: "Clases", value: p.classesCount, icon: GraduationCap },
  { label: "Reservas", value: p.bookingsCount, icon: CalendarCheck },
  { label: "Usuarios", value: p.profilesCount, icon: Users },
];

export const DashboardStats = (props: Props) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {stats(props).map((s) => (
      <Card key={s.label}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-body font-medium text-muted-foreground">
            {s.label}
          </CardTitle>
          <s.icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-display">{s.value}</div>
        </CardContent>
      </Card>
    ))}
  </div>
);
