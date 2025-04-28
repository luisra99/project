// src/app/api/reservations/by-date/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Missing 'date' query param" },
      { status: 400 }
    );
  }

  try {
    const searchDate = new Date(date);
    const reservations = await prisma.reservation.findMany({
      where: { date: searchDate },
      orderBy: { time: "asc" },
    });

    return NextResponse.json(reservations);
  } catch (error) {
    console.error(`Error fetching reservations for date ${date}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch reservations by date" },
      { status: 500 }
    );
  }
}
