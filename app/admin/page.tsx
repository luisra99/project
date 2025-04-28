"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import AdminReservationList from "@/components/admin-reservation-list";
import { login, getCurrentUser, isAdmin } from "@/lib/auth";
import { AlertCircle, Calendar, Clock, User } from "lucide-react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const user = getCurrentUser();
    if (user && user.role === "admin") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // En una aplicación real, esto haría una llamada API para autenticar
    const result = login(email, password);

    setTimeout(() => {
      setIsLoading(false);

      if (result.success && isAdmin()) {
        setIsAuthenticated(true);
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al panel de administración",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error de inicio de sesión",
          description: "Credenciales inválidas. Intente nuevamente.",
        });
      }
    }, 1000); // Retraso simulado
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto max-w-md py-20 px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Acceso de Administrador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@restaurante.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>

              <div className="bg-amber-100 p-3 rounded-md text-amber-800 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Credenciales de demostración</p>
                  <p>Correo: admin@restaurante.com</p>
                  <p>Contraseña: cualquier contraseña funcionará</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
      <p className="text-muted-foreground mb-8">
        Gestione solicitudes de reservas y disponibilidad
      </p>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Reservas Totales
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde la semana pasada
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Solicitudes Pendientes
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Requieren su atención
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Comensales Hoy
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">1 mesa de 4</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="PENDING" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="PENDING">Pendientes</TabsTrigger>
          <TabsTrigger value="CONFIRMED">Confirmadas</TabsTrigger>
          <TabsTrigger value="REJECTED">Rechazadas</TabsTrigger>
          <TabsTrigger value="all">Todas las Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="PENDING">
          <AdminReservationList status="PENDING" />
        </TabsContent>

        <TabsContent value="CONFIRMED">
          <AdminReservationList status="CONFIRMED" />
        </TabsContent>

        <TabsContent value="REJECTED">
          <AdminReservationList status="REJECTED" />
        </TabsContent>

        <TabsContent value="all">
          <AdminReservationList status="all" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
