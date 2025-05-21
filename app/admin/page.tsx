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
import { login, getCurrentUser } from "@/lib/auth";
import { AlertCircle, Calendar, Clock, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar si el usuario ya está autenticado
    const user = getCurrentUser();
    if (user && user.role === "admin") {
      setIsAuthenticated(true);
    }
  }, [user]);
  function isValidEmail(email: string): boolean {
    // Regex simple para validar email (no 100% perfecto, pero bastante decente)
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  const handleCreateUser = async () => {
    if (!isValidEmail(newEmail)) {
      toast({
        variant: "destructive",
        title: "Correo inválido",
        description: "Por favor ingresa un correo electrónico válido.",
      });
      return;
    }

    // Aquí sigue la lógica para crear usuario...
    setIsCreating(true);

    try {
      // ejemplo: llamada a API para crear usuario
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, password: newPassword }),
      });

      if (!response.ok) throw new Error("Error creando usuario");

      toast({
        title: "Usuario creado",
        description: "El usuario fue creado exitosamente.",
      });

      setIsModalOpen(false);
      setNewEmail("");
      setNewPassword("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el usuario. Intenta de nuevo.",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // En una aplicación real, esto haría una llamada API para autenticar
    const result = await login(email, password);
    if (result.success && result.user)
      setUser({
        email: result.user?.email,
        id: result.user?.id,
        role: result.user?.role,
      });
    setIsLoading(false);

    if (result.success) {
      if (result.user?.role != "ADMIN") router.push("/reservations");
      setIsAuthenticated(true);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido",
      });
      return;
    }
    toast({
      variant: "destructive",
      title: "Error de inicio de sesión",
      description: "Credenciales inválidas. Intente nuevamente.",
    });
  };

  if (user?.role != "ADMIN") {
    return (
      <div className="container mx-auto max-w-md py-20 px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Iniciar sesión
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
              <button
                type="button"
                className="w-full border border-green-500 text-green-500 rounded hover:bg-green-50 transition-colors"
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading}
              >
                Crear cuenta
              </button>

              <div className="bg-amber-100 p-3 rounded-md text-amber-800 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Credenciales de demostración</p>
                  <p>Correo: admin@restaurante.com</p>
                  <p>Contraseña: 1234</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
                aria-label="Cerrar modal"
              >
                ×
              </button>

              <h2 className="text-xl font-semibold mb-4">
                Crear nuevo usuario
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="newEmail">Correo electrónico</Label>
                  <Input
                    id="newEmail"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">Contraseña</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Contraseña segura"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  onClick={handleCreateUser}
                  disabled={isCreating}
                  className="w-full"
                >
                  {isCreating ? "Creando..." : "Crear usuario"}
                </Button>
              </div>
            </div>
          </div>
        )}
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
