import Link from "next/link";
import { UtensilsCrossed, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-playfair text-xl font-bold">
              <UtensilsCrossed className="h-6 w-6" />
              <span>Gourmet Table</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Indulge in culinary excellence with our expertly crafted dishes and impeccable service.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Reservation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/reservations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Book a Table
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Check Availability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Private Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-3">Contact Us</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>123 Gourmet Street</p>
              <p>Culinary District</p>
              <p>Foodie City, FC 12345</p>
              <p className="pt-2">Phone: (123) 456-7890</p>
              <p>Email: info@gourmettable.com</p>
            </address>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Gourmet Table. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;