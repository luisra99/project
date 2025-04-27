import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChefHat, Clock, UtensilsCrossed } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section text-center py-32 px-4 text-white">
        <div className="max-w-5xl mx-auto space-y-6 fade-in">
          <h1 className="text-4xl md:text-6xl font-bold">Experience Fine Dining</h1>
          <p className="text-xl md:text-2xl">Reserve your table today and indulge in culinary excellence</p>
          <div className="pt-8">
            <Link href="/reservations">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Make a Reservation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Dine With Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exceptional Cuisine</h3>
              <p className="text-muted-foreground">Our award-winning chefs prepare dishes using only the finest seasonal ingredients.</p>
            </div>
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Elegant Ambiance</h3>
              <p className="text-muted-foreground">Experience fine dining in our sophisticated atmosphere perfect for any occasion.</p>
            </div>
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Reservations</h3>
              <p className="text-muted-foreground">Reserve your table in minutes with our simple online reservation system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Dine?</h2>
          <p className="text-lg mb-8">Book your table now and experience our exquisite menu and impeccable service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservations">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <CalendarIcon className="mr-2 h-4 w-4" /> Reserve a Table
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline">View Our Menu</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}