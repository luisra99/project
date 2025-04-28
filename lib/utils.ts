import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DayAvailability } from "./types";
import {
  getReservationsByDate,
  isTimeSlotAvailable,
} from "@/services/reservationService";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Available time slots
export const AVAILABLE_TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

// Restaurant closing days (e.g., Mondays)
export const CLOSED_DAYS = [1]; // Monday = 1, Sunday = 0

// Get availability for a specific date
export const getAvailabilityForDate = async (
  dateString: string
): Promise<DayAvailability> => {
  const reservations = await getReservationsByDate(dateString);

  const timeSlots = await Promise.all(
    AVAILABLE_TIMES.map(async (time) => ({
      id: `${dateString}-${time}`,
      time,
      available: await isTimeSlotAvailable(dateString, time),
    }))
  );

  const isFullyBooked = timeSlots.every((slot) => !slot.available);

  return {
    date: dateString,
    timeSlots,
    isFullyBooked,
  };
};

// Format date for display (e.g., "Monday, January 1, 2025")
export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format time for display (e.g., "7:00 PM")
export const formatDisplayTime = (time: string): string => {
  console.log(time);
  const [hours, minutes] = time?.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

// Generate dates for the next N days
export const getNextNDays = (n: number): string[] => {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip closed days
    if (CLOSED_DAYS.includes(date.getDay())) {
      n++; // Add an extra day to get the desired number of dates
      continue;
    }

    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

// Get status color based on reservation status
export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return "CheckCircle";
    case "pending":
      return "Clock";
    case "rejected":
      return "XCircle";
    case "cancelled":
      return "Slash";
    default:
      return "HelpCircle";
  }
};
