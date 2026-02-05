import { Calendar, CreditCard, MapPin, Palette, Star, Users } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Créditos Flexibles",
    description: "Usa tus créditos en cualquier estudio. Sin compromiso, sin complicaciones.",
  },
  {
    icon: MapPin,
    title: "Estudios Cercanos",
    description: "Encuentra talleres de arte en tu zona con nuestro mapa interactivo.",
  },
  {
    icon: Calendar,
    title: "Reserva Instantánea",
    description: "Reserva tu lugar en segundos. Recibe confirmación inmediata.",
  },
  {
    icon: Palette,
    title: "Todas las Disciplinas",
    description: "Pintura, cerámica, escultura, fotografía y mucho más.",
  },
  {
    icon: Users,
    title: "Comunidad Artística",
    description: "Conecta con otros artistas y comparte tu creatividad.",
  },
  {
    icon: Star,
    title: "Instructores Expertos",
    description: "Aprende de artistas profesionales apasionados por enseñar.",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Todo lo que necesitas para{" "}
            <span className="text-primary italic">crear</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            ArtPass te conecta con los mejores estudios de arte de tu ciudad
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 bg-background rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
