"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Reservation } from "@/lib/types";
import { useReservations } from "./reservation-provider";
import {
  formatDisplayDate,
  formatDisplayTime,
  getStatusColor,
  getStatusIcon,
} from "@/lib/utils";
import {
  CheckCircle,
  Clock,
  Loader2,
  User,
  Users,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";

interface AdminReservationListProps {
  status: string;
}

export default function AdminReservationList({
  status,
}: AdminReservationListProps) {
  const { reservations, loading, updateStatus, refreshReservations } =
    useReservations();
  const [processing, setProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  // Filtrar reservas según estado
  const filteredReservations =
    status === "all"
      ? reservations
      : reservations.filter((r) => r.status === status);

  // Manejar actualización de estado
  const handleStatusUpdate = async (
    id: string,
    newStatus: Reservation["status"]
  ) => {
    setProcessing(id);

    try {
      const updated = await updateStatus(id, newStatus);

      if (updated) {
        toast({
          title: "Estado actualizado",
          description: `La reserva ${id} ahora está ${newStatus.toLowerCase()}`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al actualizar",
        description: "Hubo un error al actualizar el estado de la reserva",
      });
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (filteredReservations.length === 0) {
    return (
      <div className="text-center py-10">
        <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-lg font-medium">No se encontraron reservas</h3>
        <p className="text-muted-foreground">
          {status === "all"
            ? "Aún no hay reservas en el sistema."
            : `No hay reservas ${status.toLowerCase()}.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredReservations.map((reservation) => {
        const StatusIcon = getStatusIcon(reservation.status);

        return (
          <Card key={reservation.id} className="reservation-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    {reservation.guestName}
                  </CardTitle>
                  <CardDescription>{reservation.guestEmail}</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className={getStatusColor(reservation.status)}
                >
                  {reservation.status.charAt(0).toUpperCase() +
                    reservation.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDisplayTime(reservation.time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{reservation.partySize} personas</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{reservation.guestPhone}</span>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-md text-sm">
                <p className="font-medium mb-1">Fecha</p>
                <p>{formatDisplayDate(reservation.date)}</p>

                {reservation.specialRequests && (
                  <>
                    <p className="font-medium mt-3 mb-1">
                      Solicitudes especiales
                    </p>
                    <p className="text-muted-foreground">
                      {reservation.specialRequests}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {reservation.status === "PENDING" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 mr-2"
                    onClick={() =>
                      handleStatusUpdate(reservation.id, "REJECTED")
                    }
                    disabled={!!processing}
                  >
                    {processing === reservation.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-2" />
                    )}
                    Rechazar
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      handleStatusUpdate(reservation.id, "CONFIRMED")
                    }
                    disabled={!!processing}
                  >
                    {processing === reservation.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    )}
                    Confirmar
                  </Button>
                </>
              )}

              {reservation.status === "CONFIRMED" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <XCircle className="h-4 w-4 mr-2" /> Cancelar Reserva
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Cancelar reserva?</AlertDialogTitle>
                      <AlertDialogDescription>
                        ¿Estás seguro de que deseas cancelar esta reserva? Esta
                        acción no se puede deshacer.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Mantener reserva</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleStatusUpdate(reservation.id, "CANCELLED")
                        }
                      >
                        Cancelar Reserva
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              {["rejected", "cancelled"].includes(reservation.status) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    handleStatusUpdate(reservation.id, "CONFIRMED")
                  }
                  disabled={!!processing}
                >
                  {processing === reservation.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Restaurar y Confirmar
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
