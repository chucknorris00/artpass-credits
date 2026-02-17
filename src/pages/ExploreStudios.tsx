import { Link } from "react-router-dom";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { useStudios, useClasses } from "@/hooks/useStudios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Clock, Users, Sparkles, User, CreditCard } from "lucide-react";
import { useState } from "react";

const ExploreStudios = () => {
  const { data: studios, isLoading: loadingStudios } = useStudios();
  const { data: classes, isLoading: loadingClasses } = useClasses();
  const [selectedStudio, setSelectedStudio] = useState<string | null>(null);

  const filteredClasses = selectedStudio
    ? classes?.filter((c) => c.studio_id === selectedStudio)
    : classes;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 space-y-10">
          {/* Page heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Explorar Estudios
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre talleres de arte cerca de ti. Filtra por estudio y encuentra la clase perfecta para ti.
            </p>
          </div>

          {/* Studio filter chips */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">Estudios</h2>
            {loadingStudios ? (
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-32 rounded-full" />
                ))}
              </div>
            ) : !studios?.length ? (
              <p className="text-muted-foreground">No hay estudios disponibles aún.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedStudio(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    !selectedStudio
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:bg-accent"
                  }`}
                >
                  Todos
                </button>
                {studios.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStudio(s.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      selectedStudio === s.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:bg-accent"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}

            {/* Selected studio detail */}
            {selectedStudio && studios && (
              (() => {
                const studio = studios.find((s) => s.id === selectedStudio);
                if (!studio) return null;
                return (
                  <Card className="bg-card/60 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="font-display">{studio.name}</CardTitle>
                      {studio.description && (
                        <CardDescription>{studio.description}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {studio.address}
                      </span>
                      {studio.phone && (
                        <span className="flex items-center gap-1.5">📞 {studio.phone}</span>
                      )}
                      {studio.art_categories?.length ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Sparkles className="w-4 h-4" />
                          {studio.art_categories.map((cat) => (
                            <Badge key={cat} variant="outline">{cat}</Badge>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })()
            )}
          </section>

          {/* Classes grid */}
          <section className="space-y-4">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Clases disponibles
              {selectedStudio && studios
                ? ` en ${studios.find((s) => s.id === selectedStudio)?.name ?? ""}`
                : ""}
            </h2>

            {loadingClasses ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-56 rounded-lg" />
                ))}
              </div>
            ) : !filteredClasses?.length ? (
              <p className="text-muted-foreground text-center py-12">
                No hay clases disponibles en este momento.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredClasses.map((c) => (
                  <Card
                    key={c.id}
                    className="group hover:shadow-md transition-shadow border-border/60"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg font-display leading-tight">
                          {c.name}
                        </CardTitle>
                        {c.art_category && (
                          <Badge variant="secondary" className="shrink-0">
                            {c.art_category}
                          </Badge>
                        )}
                      </div>
                      {!selectedStudio && (c as any).studios?.name && (
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {(c as any).studios.name}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {c.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {c.description}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary" />
                          {c.schedule}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-primary" />
                          Cupo: {c.max_capacity}
                        </span>
                        {c.instructor_name && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-primary" />
                            {c.instructor_name}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-primary" />
                          {c.credit_cost} créditos
                        </span>
                      </div>
                      {c.duration_minutes && (
                        <p className="text-xs text-muted-foreground">
                          Duración: {c.duration_minutes} min
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreStudios;
