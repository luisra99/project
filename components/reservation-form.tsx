"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useReservations } from "./reservation-provider";
import { formatDisplayDate, formatDisplayTime } from "@/lib/utils";

const formSchema = z.object({
  guestName: z.string().min(2, "El nombre completo es obligatorio"),
  guestEmail: z.string().email("Se requiere un correo electrónico válido"),
  guestPhone: z.string().min(10, "Se requiere un número de teléfono válido"),
  partySize: z.coerce
    .number()
    .min(1)
    .max(20, "El tamaño máximo del grupo es 20"),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReservationFormProps {
  selectedDate: string;
  selectedTime: string;
}

export default function ReservationForm({
  selectedDate,
  selectedTime,
}: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { addReservation } = useReservations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      partySize: 2,
      specialRequests: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Enviar la reserva a nuestra base de datos simulada
      await addReservation({
        ...data,
        date: selectedDate,
        time: selectedTime,
      });

      // Mostrar estado de éxito
      setIsSuccess(true);

      toast({
        title: "¡Reserva enviada!",
        description:
          "Hemos recibido tu solicitud de reserva y la confirmaremos en breve.",
      });

      // Reiniciar formulario
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Algo salió mal",
        description:
          "Hubo un error al enviar tu reserva. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 space-y-4">
        <h3 className="text-2xl font-bold text-primary">¡Gracias!</h3>
        <p className="text-lg">Tu solicitud de reserva ha sido enviada.</p>
        <p className="text-muted-foreground">
          Revisaremos tu solicitud y te enviaremos una confirmación por correo
          electrónico en breve.
        </p>
        <div className="bg-muted p-4 rounded-lg inline-block mx-auto mt-4">
          <p>
            <strong>Fecha:</strong> {formatDisplayDate(selectedDate)}
          </p>
          <p>
            <strong>Hora:</strong> {formatDisplayTime(selectedTime)}
          </p>
          <p>
            <strong>Número de personas:</strong> {form.getValues().partySize}
          </p>
        </div>
        <div className="pt-6">
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Detalles de tu reserva</h3>
        <p className="text-muted-foreground">
          {formatDisplayDate(selectedDate)} a las{" "}
          {formatDisplayTime(selectedTime)}
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Juan Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="guestEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guestPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="partySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de personas</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="20" {...field} />
                </FormControl>
                <FormDescription>
                  Para grupos mayores de 8 personas, por favor llámanos
                  directamente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peticiones especiales</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="¿Alguna restricción alimentaria, celebración o preferencia de asientos?"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Haremos lo posible por atender tus peticiones.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Completar reserva"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
