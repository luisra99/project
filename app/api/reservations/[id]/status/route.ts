// src/app/api/reservations/[id]/status/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status } = await req.json();

  try {
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error(`Error updating reservation status ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to update reservation status" },
      { status: 500 }
    );
  }
}
