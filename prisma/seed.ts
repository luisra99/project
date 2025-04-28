// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeder...");

  // Limpieza brutal
  await prisma.timeSlot.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.user.deleteMany();

  console.log("🧹 Database cleaned.");

  // Crear usuarios
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      role: "ADMIN",
    },
  });

  const guest = await prisma.user.create({
    data: {
      name: "Guest User",
      email: "guest@example.com",
      role: "GUEST",
    },
  });

  console.log("👤 Users created.");

  // Fechas base
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // Crear reservas
  await prisma.reservation.createMany({
    data: [
      {
        guestName: "John Smith",
        guestEmail: "john@example.com",
        guestPhone: "555-123-4567",
        partySize: 4,
        date: new Date(formatDate(today)),
        time: "19:00",
        status: "CONFIRMED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guestName: "Maria Garcia",
        guestEmail: "maria@example.com",
        guestPhone: "555-987-6543",
        partySize: 2,
        date: new Date(formatDate(tomorrow)),
        time: "20:00",
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        guestName: "Ahmed Hassan",
        guestEmail: "ahmed@example.com",
        guestPhone: "555-456-7890",
        partySize: 6,
        date: new Date(formatDate(tomorrow)),
        time: "18:30",
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("📅 Reservations created.");

  // Crear slots de tiempo
  await prisma.timeSlot.createMany({
    data: [
      {
        date: new Date(formatDate(today)),
        time: "19:00",
        available: true,
      },
      {
        date: new Date(formatDate(tomorrow)),
        time: "20:00",
        available: true,
      },
      {
        date: new Date(formatDate(tomorrow)),
        time: "18:30",
        available: false,
      },
    ],
  });

  console.log("🕒 Time slots created.");

  console.log("✅ Seeder finished successfully.");
}
try {
  main()
    .catch((e) => {
      console.error("🔥 Seeder failed:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} catch (e) {
  console.error("🔥 Seeder failed:", e);
  process.exit(1);
}
