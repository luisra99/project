"use client";

import { useState } from "react";
import ReservationForm from "@/components/reservation-form";
import CalendarView from "@/components/calendar-view";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNextNDays } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate dates for the next 14 days
  const availableDates = getNextNDays(7);

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <h1 className="text-4xl font-bold mb-2 text-center">
        Haz una reservación
      </h1>
      <p className="text-muted-foreground text-center mb-10">
        Selecciona tu fecha y hora preferidas, luego completa tus detalles para
        reservar tu mesa.
      </p>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="calendar">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Seleccionar fecha
          </TabsTrigger>
          <TabsTrigger value="form" disabled={!selectedDate || !selectedTime}>
            <Clock className="mr-2 h-4 w-4" />
            Tus detalles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-8">
          <Card className="p-6">
            <CalendarView
              availableDates={availableDates}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateSelect={handleDateSelection}
              onTimeSelect={handleTimeSelection}
            />
          </Card>

          {selectedDate && selectedTime && (
            <div className="text-center">
              <p className="text-lg mb-4">
                Has seleccionado:{" "}
                <span className="font-semibold">
                  {new Date(selectedDate).toLocaleDateString("es-ES", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  a las {selectedTime}
                </span>
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="form">
          <Card className="p-6">
            {selectedDate && selectedTime && (
              <ReservationForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
