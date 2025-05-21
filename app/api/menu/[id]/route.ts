// app/api/offers/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.menuItem.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ ok: true });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const item = await prisma.menuItem.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(item);
}
