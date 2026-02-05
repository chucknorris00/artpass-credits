import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Elige tu plan",
    description: "Selecciona el plan que mejor se adapte a tu ritmo creativo.",
  },
  {
    step: "02",
    title: "Explora estudios",
    description: "Descubre talleres de arte cerca de ti con nuestro mapa interactivo.",
  },
  {
    step: "03",
    title: "Reserva con créditos",
    description: "Usa tus créditos para reservar clases en cualquier estudio.",
  },
  {
    step: "04",
    title: "¡Crea!",
    description: "Asiste a tus clases y deja volar tu creatividad.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Así de <span className="text-primary italic">simple</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            En 4 pasos estarás creando en tu estudio favorito
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-card p-8 rounded-2xl shadow-soft h-full transition-all duration-300 group-hover:shadow-elevated group-hover:-translate-y-1">
                <div className="text-5xl font-display font-bold text-primary/20 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
