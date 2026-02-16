import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Globe, Phone, Mail, Palette } from "lucide-react";
import { useStudio, useClasses, useBookings } from "@/hooks/useStudios";
import { ClassesTable } from "@/components/dashboard/ClassesTable";
import { BookingsTable } from "@/components/dashboard/BookingsTable";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StudioDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { data: studio, isLoading: loadingStudio } = useStudio(id!);
  const { data: classes, isLoading: loadingClasses } = useClasses(id);
  const { data: bookings, isLoading: loadingBookings } = useBookings(id);

  if (loadingStudio) {
    return (
      <div className="min-h-screen bg-background p-8 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Estudio no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 py-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold">{studio.name}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {studio.address}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-8">
        {/* Studio info card */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {studio.description && (
              <p className="text-muted-foreground">{studio.description}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm">
              {studio.website && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Globe className="h-4 w-4" /> {studio.website}
                </span>
              )}
              {studio.phone && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Phone className="h-4 w-4" /> {studio.phone}
                </span>
              )}
              {studio.email && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {studio.email}
                </span>
              )}
            </div>
            {studio.art_categories && studio.art_categories.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Palette className="h-4 w-4 text-muted-foreground" />
                {studio.art_categories.map((cat) => (
                  <Badge key={cat} variant="secondary">{cat}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-display font-bold">{classes?.length ?? 0}</p>
              <p className="text-sm text-muted-foreground">Clases activas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-display font-bold">{bookings?.length ?? 0}</p>
              <p className="text-sm text-muted-foreground">Reservas totales</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="classes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes">Clases</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <ClassesTable classes={classes} isLoading={loadingClasses} showStudio={false} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTable bookings={bookings} isLoading={loadingBookings} showStudio={false} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudioDashboard;
