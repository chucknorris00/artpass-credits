import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useStudios, useClasses, useBookings, useProfiles } from "@/hooks/useStudios";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { StudioCard } from "@/components/dashboard/StudioCard";
import { ClassesTable } from "@/components/dashboard/ClassesTable";
import { BookingsTable } from "@/components/dashboard/BookingsTable";
import { ProfilesTable } from "@/components/dashboard/ProfilesTable";

const Dashboard = () => {
  const { data: studios, isLoading: loadingStudios } = useStudios();
  const { data: classes, isLoading: loadingClasses } = useClasses();
  const { data: bookings, isLoading: loadingBookings } = useBookings();
  const { data: profiles, isLoading: loadingProfiles } = useProfiles();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold">Dashboard ArtPass</h1>
            <p className="text-sm text-muted-foreground">Visión general de todos los estudios</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-8">
        <DashboardStats
          studiosCount={studios?.length ?? 0}
          classesCount={classes?.length ?? 0}
          bookingsCount={bookings?.length ?? 0}
          profilesCount={profiles?.length ?? 0}
        />

        <Tabs defaultValue="studios" className="space-y-4">
          <TabsList>
            <TabsTrigger value="studios">Estudios</TabsTrigger>
            <TabsTrigger value="classes">Clases</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="profiles">Perfiles</TabsTrigger>
          </TabsList>

          <TabsContent value="studios">
            {loadingStudios ? (
              <p className="text-muted-foreground">Cargando…</p>
            ) : !studios?.length ? (
              <p className="text-muted-foreground text-center py-8">No hay estudios registrados.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {studios.map((s) => (
                  <StudioCard key={s.id} studio={s} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="classes">
            <ClassesTable classes={classes} isLoading={loadingClasses} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTable bookings={bookings} isLoading={loadingBookings} />
          </TabsContent>

          <TabsContent value="profiles">
            <ProfilesTable profiles={profiles} isLoading={loadingProfiles} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
