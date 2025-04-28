// Types for the reservation system
export type UserRole = "guest" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  time: string;
  specialRequests?: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export type TimeSlot = {
  id: string;
  time: string;
  available: boolean;
};

export type DayAvailability = {
  date: string;
  timeSlots: TimeSlot[];
  isFullyBooked: boolean;
};
