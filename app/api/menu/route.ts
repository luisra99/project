// app/api/menu/route.ts

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.menuItem.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const data = await req.json();
  const item = await prisma.menuItem.create({ data });
  return NextResponse.json(item);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const item = await prisma.menuItem.update({
    where: { id: data.id },
    data,
  });
  return NextResponse.json(item);
}
