import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChefHat, Clock, UtensilsCrossed } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section text-center py-32 px-4 text-white">
        <div className="max-w-5xl mx-auto space-y-6 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold">
            Experimenta la alta cocina
          </h1>
          <p className="text-xl md:text-2xl">
            Reserva tu mesa hoy y disfruta de excelencia culinaria
          </p>
          <div className="pt-8">
            <Link href="/reservations">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Hacer una reserva
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿Por qué cenar con nosotros?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cocina excepcional</h3>
              <p className="text-muted-foreground">
                Nuestros chefs galardonados preparan platos con los mejores
                ingredientes de temporada.
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Ambiente elegante</h3>
              <p className="text-muted-foreground">
                Experimenta la alta cocina en nuestro sofisticado ambiente
                perfecto para cualquier ocasión.
              </p>
            </div>
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reservas fáciles</h3>
              <p className="text-muted-foreground">
                Reserva tu mesa en minutos con nuestro sencillo sistema de
                reservas en línea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para cenar?</h2>
          <p className="text-lg mb-8">
            Reserva tu mesa ahora y disfruta de nuestro exquisito menú y
            servicio impecable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservations">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <CalendarIcon className="mr-2 h-4 w-4" /> Reservar mesa
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline">Ver nuestro menú</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
