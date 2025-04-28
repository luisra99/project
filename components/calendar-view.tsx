"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatDisplayDate,
  formatDisplayTime,
  getAvailabilityForDate,
} from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DayAvailability } from "@/lib/types";

interface CalendarViewProps {
  availableDates: string[];
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function CalendarView({
  availableDates,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: CalendarViewProps) {
  const [dateAvailability, setDateAvailability] =
    useState<DayAvailability | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const availability = getAvailabilityForDate(selectedDate).then(
        (response) => {
          setDateAvailability(response);
        }
      );
    } else {
      setDateAvailability(null);
    }
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Select a Date
        </h3>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex p-4 gap-2" style={{ justifyContent: "center" }}>
            {availableDates.map((date) => {
              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              const isSelected = date === selectedDate;

              return (
                <div
                  key={date}
                  className={`calendar-day min-w-[100px] ${
                    isSelected ? "selected" : "available"
                  }`}
                  onClick={() => onDateSelect(date)}
                >
                  <div>{formattedDate.split(", ")[0]}</div>
                  <div className="text-lg font-semibold">
                    {formattedDate.split(", ")[1].split(" ")[1]}
                  </div>
                  <div>{formattedDate.split(", ")[1].split(" ")[0]}</div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {selectedDate && dateAvailability && (
        <div className="space-y-3 fade-in">
          <h3 className="text-lg font-medium">
            Available Times for {formatDisplayDate(selectedDate)}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
            {dateAvailability.timeSlots.map((slot) => {
              console.log(slot);
              const isSelected = selectedTime === slot.time;
              const displayTime = formatDisplayTime(slot.time);

              return (
                <div
                  key={slot.id}
                  className={`time-slot ${
                    isSelected
                      ? "selected"
                      : slot.available
                      ? "available"
                      : "unavailable"
                  }`}
                  onClick={() => {
                    if (slot.available) {
                      onTimeSelect(slot.time);
                    }
                  }}
                >
                  {displayTime}
                </div>
              );
            })}
          </div>

          {!selectedTime && (
            <p className="text-sm text-muted-foreground mt-2">
              Please select a time slot
            </p>
          )}
        </div>
      )}

      {selectedDate && selectedTime && (
        <div className="mt-6 text-center">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              document
                .querySelector('[data-value="form"]')
                ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            }}
          >
            Continue to Details
          </Button>
        </div>
      )}
    </div>
  );
}
