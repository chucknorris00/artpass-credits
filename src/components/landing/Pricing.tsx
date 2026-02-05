import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Básico",
    price: "$29.99",
    credits: 4,
    description: "Perfecto para empezar",
    features: [
      "4 créditos mensuales",
      "Acceso a todos los estudios",
      "Reserva hasta 24h antes",
      "Cancelación gratuita",
    ],
    popular: false,
  },
  {
    name: "Estándar",
    price: "$49.99",
    credits: 8,
    description: "El más popular",
    features: [
      "8 créditos mensuales",
      "Acceso a todos los estudios",
      "Reserva hasta 1 semana antes",
      "Cancelación gratuita",
      "Créditos acumulables",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "$79.99",
    credits: 12,
    description: "Para apasionados",
    features: [
      "12 créditos mensuales",
      "Acceso a todos los estudios",
      "Reserva prioritaria",
      "Cancelación gratuita",
      "Créditos acumulables",
      "Acceso fines de semana ilimitado",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Planes que se adaptan a{" "}
            <span className="text-primary italic">tu ritmo</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Elige el plan perfecto para tu viaje artístico
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-terracotta scale-105"
                  : "bg-card shadow-soft hover:shadow-elevated"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  Más popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>/mes</span>
                </div>
                <p className={`mt-2 text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.credits} créditos incluidos
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "heroOutline" : "hero"}
                size="lg"
                className={`w-full ${plan.popular ? "border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" : ""}`}
              >
                Elegir plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
