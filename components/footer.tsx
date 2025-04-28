import Link from "next/link";
import { UtensilsCrossed, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-5 border-t bg-muted/40">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-playfair text-xl font-bold"
            >
              <UtensilsCrossed className="h-6 w-6" />
              <span>Mesa Gourmet</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Disfruta de la excelencia culinaria con nuestros platos
              cuidadosamente elaborados y un servicio impecable.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Reservas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/reservations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Reservar una mesa
                </Link>
              </li>
              <li>
                <Link
                  href="/reservations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Consultar disponibilidad
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Eventos privados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nuestro menú
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Contáctanos</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Calle Gourmet 123</p>
              <p>Distrito Culinario</p>
              <p>Ciudad Foodie, FC 12345</p>
              <p className="pt-2">Teléfono: (123) 456-7890</p>
              <p>Email: info@mesagourmet.com</p>
            </address>
            <div className="flex gap-4 mt-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mesa Gourmet. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Política de privacidad
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Términos de servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
