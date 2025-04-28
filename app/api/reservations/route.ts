import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Error en GET /api/reservations:", error);
    return NextResponse.json(
      { error: "Algo salió mal. Quizás fue tu culpa, quizás fue la mía." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      date,
      time,
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      specialRequests,
    } = await req.json();

    const reservation = await prisma.reservation.create({
      data: {
        date: new Date(date),
        time,
        guestName,
        guestEmail,
        guestPhone,
        partySize,
        specialRequests,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/reservations:", JSON.stringify(error));
    return NextResponse.json(
      { error: "Algo salió mal. Quizás fue tu culpa, quizás fue la mía." },
      { status: 500 }
    );
  }
}
