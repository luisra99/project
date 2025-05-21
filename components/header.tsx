"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 px-5 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-playfair text-xl md:text-2xl font-bold"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span>Mesa Gourmet</span>
          </Link>
        </div>

        {/* Navegación de escritorio */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Inicio
          </Link>
          <Link
            href="/menu"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Menú
          </Link>
          {user?.role == "GEST" && (
            <Link
              href="/reservations"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Reservas
            </Link>
          )}
          {user?.role == "ADMIN" && (
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Reservas
            </Link>
          )}
          {user?.id ? (
            <Button
              onClick={() => {
                setUser(null);
                router.push("/");
              }}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Link href="/admin">
              <Button>Iniciar sesión</Button>
            </Link>
          )}
        </nav>

        {/* Navegación móvil */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[385px]">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-playfair text-xl font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  <UtensilsCrossed className="h-6 w-6" />
                  <span>Mesa Gourmet</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Cerrar menú</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/menu"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Menú
                </Link>
                <Link
                  href="/reservations"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Reservas
                </Link>
                {isAdmin() && (
                  <Link
                    href="/admin"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link href="/reservations" onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-4">Reservar una mesa</Button>
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
