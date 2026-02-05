import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full shadow-soft mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Tu pasaporte al mundo del arte
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in text-balance" style={{ animationDelay: "0.1s" }}>
            Descubre talleres de arte{" "}
            <span className="text-primary italic">cerca de ti</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in font-body" style={{ animationDelay: "0.2s" }}>
            Una membresía, cientos de estudios. Pintura, cerámica, escultura y más. 
            Reserva clases con créditos flexibles.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" className="group">
              Comenzar gratis
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="heroOutline" size="xl">
              <Palette className="w-5 h-5" />
              Explorar estudios
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "50+", label: "Estudios" },
              { value: "200+", label: "Clases mensuales" },
              { value: "1,500+", label: "Artistas activos" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
