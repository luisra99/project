"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/AuthProvider";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export default function MenuPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const admin = user?.role === "ADMIN"; // Cambia esto por isAdmin() si lo tienes

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data); // Debug
        setMenuItems(data);
      })
      .catch((err) => console.error("Error fetching menu:", err));
  }, []);

  const grouped = {
    entradas: menuItems.filter((item) => item.category === "Entradas"),
    principales: menuItems.filter((item) => item.category === "Principal"),
    postres: menuItems.filter((item) => item.category === "Postres"),
    platos: menuItems.filter((item) => item.category === "Platos"),
    bebidas: menuItems.filter((item) => item.category === "Bebidas"),
  };

  const renderSection = (title: string, items: MenuItem[]) => (
    <section className="mb-10">
      <div className="flex items-center justify-center mb-6">
        <div className="h-px bg-muted flex-grow" />
        <h2 className="text-2xl font-semibold px-4">{title}</h2>
        <div className="h-px bg-muted flex-grow" />
      </div>

      <div className="grid gap-4">
        {items.map((offer) => (
          <Card key={offer.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{offer.name}</h3>
                  <p className="text-muted-foreground">{offer.description}</p>
                </div>
                <span className="font-medium">${offer.price}</span>
              </div>
              {admin && (
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    onClick={() => router.push(`/menu/edit/${offer.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      // Podés reemplazar esto con tu DeleteButton o lógica real
                      if (confirm("¿Eliminar esta oferta?")) {
                        fetch(`/api/menu/${offer.id}`, {
                          method: "DELETE",
                        }).then(() =>
                          setMenuItems((prev) =>
                            prev.filter((i) => i.id !== offer.id)
                          )
                        );
                      }
                    }}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-2 text-center">Nuestro Menú</h1>
      <p className="text-muted-foreground text-center mb-10">
        Elaborado con pasión y los mejores ingredientes
      </p>

      {admin && (
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.push("/menu/create")}>
            Crear Oferta
          </Button>
        </div>
      )}

      {renderSection("Entradas", grouped.entradas)}
      {renderSection("Platos Principales", grouped.platos)}
      {renderSection("Postres", grouped.postres)}
      {renderSection("Bebidas", grouped.bebidas)}

      <div className="mt-12">
        <Separator className="mb-6" />
        <p className="text-center text-sm text-muted-foreground italic">
          Nuestro menú cambia según la temporada para incorporar los
          ingredientes más frescos. <br />
          Por favor informe a su mesero sobre cualquier alergia o restricción
          dietética.
        </p>
      </div>
    </div>
  );
}
