import { Palette } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  producto: [
    { label: "Estudios", href: "#" },
    { label: "Planes", href: "#" },
    { label: "Para empresas", href: "#" },
  ],
  compañía: [
    { label: "Acerca de", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carreras", href: "#" },
  ],
  soporte: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Política de privacidad", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">ArtPass</span>
            </Link>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">
              Tu pasaporte al mundo del arte. Descubre, aprende y crea en los mejores estudios de tu ciudad.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-foreground mb-4 capitalize">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm font-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-body">
            © 2024 ArtPass. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
