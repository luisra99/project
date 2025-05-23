"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Reservation } from "@/lib/types";
import {
  createReservation,
  getReservations,
  updateReservationStatus,
} from "@/services/reservationService";

interface ReservationContextType {
  reservations: Reservation[];
  loading: boolean;
  addReservation: (
    data: Omit<Reservation, "id" | "createdAt" | "updatedAt" | "status">
  ) => Promise<Reservation>;
  updateStatus: (
    id: string,
    status: Reservation["status"]
  ) => Promise<Reservation | null>;
  refreshReservations: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshReservations = async () => {
    // In a real app, this would fetch from an API
    const data: any = await getReservations();
    setReservations(data);
    setLoading(false);
  };

  useEffect(() => {
    refreshReservations();
  }, []);

  const addReservation = async (data: any) => {
    // In a real app, this would be an API call
    const newReservation: any = await createReservation(data);
    setReservations([...reservations, newReservation]);
    return newReservation;
  };

  const updateStatus = async (id: string, status: Reservation["status"]) => {
    // In a real app, this would be an API call
    const updated: any = await updateReservationStatus(id, status);
    if (updated) {
      setReservations(reservations.map((r) => (r.id === id ? updated : r)));
    }
    return updated;
  };

  const value = {
    reservations,
    loading,
    addReservation,
    updateStatus,
    refreshReservations,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservations = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error(
      "useReservations must be used within a ReservationProvider"
    );
  }
  return context;
};
