import { PrismaClient, Prisma } from "@prisma/client";
import { Reservation } from "./types";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// ===================== Reservation Functions =====================

export const isTimeSlotAvailable = async (date: string, time: string) => {
  const existingReservations = await prisma.reservation.findMany({
    where: {
      date,
      time,
      status: {
        in: ["CONFIRMED", "PENDING"],
      },
    },
  });

  // Limite hardcodeado: 3 reservas por slot (ajustable si quieres en el futuro)
  return existingReservations.length < 1;
};

export async function getReservations() {
  try {
    return await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw new Error("Failed to fetch reservations");
  }
}

export async function getReservationById(id: string) {
  try {
    return await prisma.reservation.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Error fetching reservation ${id}:`, error);
    throw new Error("Failed to fetch reservation");
  }
}

export async function getReservationsByDate(date: string) {
  try {
    const searchDate = new Date(date);
    return await prisma.reservation.findMany({
      where: { date: searchDate },
      orderBy: { time: "asc" },
    });
  } catch (error) {
    console.error(`Error fetching reservations for date ${date}:`, error);
    throw new Error("Failed to fetch reservations by date");
  }
}

export async function getReservationsByStatus(status: Reservation["status"]) {
  try {
    return await prisma.reservation.findMany({
      where: { status },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });
  } catch (error) {
    console.error(`Error fetching reservations with status ${status}:`, error);
    throw new Error("Failed to fetch reservations by status");
  }
}

export async function createReservation(
  data: Omit<Reservation, "id" | "createdAt" | "updatedAt" | "status">
) {
  try {
    return await prisma.reservation.create({
      data: {
        ...data,
        date: new Date(data.date),
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw new Error("Failed to create reservation");
  }
}

export async function updateReservation(
  id: string,
  updates: Partial<Reservation>
) {
  try {
    return await prisma.reservation.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(`Error updating reservation ${id}:`, error);
    throw new Error("Failed to update reservation");
  }
}

export async function updateReservationStatus(
  id: string,
  status: Reservation["status"]
) {
  try {
    return await prisma.reservation.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(`Error updating reservation status ${id}:`, error);
    throw new Error("Failed to update reservation status");
  }
}

export async function deleteReservation(id: string) {
  try {
    return await prisma.reservation.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting reservation ${id}:`, error);
    throw new Error("Failed to delete reservation");
  }
}

// ===================== Time Slot Functions =====================

export async function getTimeSlotAvailability(
  date: string,
  time: string
): Promise<boolean> {
  try {
    const searchDate = new Date(date);
    const reservationCount = await prisma.reservation.count({
      where: {
        date: { equals: searchDate },
        time: { equals: time },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    const timeSlot = await prisma.timeSlot.findUnique({
      where: {
        date_time: {
          date: searchDate,
          time: time,
        },
      },
    });

    return reservationCount < 1 && (!timeSlot || timeSlot.available);
  } catch (error) {
    console.error(
      `Error checking time slot availability for ${date} ${time}:`,
      error
    );
    throw new Error("Failed to check time slot availability");
  }
}

export async function updateTimeSlotAvailability(
  date: string,
  time: string,
  available: boolean
) {
  try {
    const searchDate = new Date(date);
    return await prisma.timeSlot.upsert({
      where: {
        date_time: {
          date: searchDate,
          time: time,
        },
      },
      update: {
        available,
        updatedAt: new Date(),
      },
      create: {
        date: searchDate,
        time: time,
        available,
      },
    });
  } catch (error) {
    console.error(
      `Error updating time slot availability for ${date} ${time}:`,
      error
    );
    throw new Error("Failed to update time slot availability");
  }
}

// ===================== User Functions =====================

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw new Error("Failed to fetch user");
  }
}

export async function createUser(data: {
  name: string;
  email: string;
  password?: string;
  role?: "GUEST" | "ADMIN";
}) {
  try {
    return await prisma.user.create({
      data: {
        ...data,
        role: data.role || "GUEST",
      },
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw new Error("A user with this email already exists");
    }
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
