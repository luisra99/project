// src/app/api/reservations/available/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  if (!date || !time) {
    return NextResponse.json(
      { error: "Missing 'date' or 'time' query param" },
      { status: 400 }
    );
  }

  try {
    const searchDate = new Date(date);
    const reservations = await prisma.reservation.findMany({
      where: {
        date: searchDate,
        time,
        status: { in: ["CONFIRMED", "PENDING"] }, // Only consider confirmed or pending reservations
      },
    });

    const isAvailable = reservations.length < 1; // Limitar a 3 reservas por cada franja horaria

    return NextResponse.json({ available: isAvailable });
  } catch (error) {
    console.error("Error fetching reservation availability:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
