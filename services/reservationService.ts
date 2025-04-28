// services/reservationService.ts

interface Reservation {
  id?: number;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED" | "CANCELLED";
}

export const updateReservationStatus = async (
  id: string,
  status: Reservation["status"]
): Promise<Reservation> => {
  const res = await fetch(`/api/reservations/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Error al actualizar el estado de la reserva.");
  return res.json();
};

export const getReservations = async (): Promise<Reservation[]> => {
  const res = await fetch("/api/reservations");
  if (!res.ok)
    throw new Error("Error al obtener las reservas." + JSON.stringify(res));
  return res.json();
};

export const createReservation = async (
  reservation: Omit<Reservation, "id">
): Promise<Reservation> => {
  const res = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Error al crear la reserva.");
  return res.json();
};

export const updateReservation = async (
  id: number,
  reservation: Partial<Reservation>
): Promise<Reservation> => {
  const res = await fetch(`/api/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservation),
  });
  if (!res.ok) throw new Error("Error al actualizar la reserva.");
  return res.json();
};

export const deleteReservation = async (id: number): Promise<void> => {
  const res = await fetch(`/api/reservations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar la reserva.");
};

export const isTimeSlotAvailable = async (
  date: string,
  time: string
): Promise<boolean> => {
  const res = await fetch(
    `/api/reservations/available?date=${encodeURIComponent(
      date
    )}&time=${encodeURIComponent(time)}`
  );
  if (!res.ok) throw new Error("Error al verificar la disponibilidad.");
  const data = await res.json();
  console.log("DISPONIBLE", data);
  return data.available;
};

// src/services/reservationService.ts

export async function getReservationsByDate(
  date: string
): Promise<Reservation[]> {
  try {
    const res = await fetch(
      `/api/reservations/by-date?date=${encodeURIComponent(date)}`
    );

    if (!res.ok) {
      throw new Error(`Error al obtener las reservas: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(
      `Error al obtener las reservas para la fecha ${date}:`,
      error
    );
    throw new Error("No se pudieron obtener las reservas por fecha");
  }
}
