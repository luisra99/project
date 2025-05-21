// app/api/offers/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  const user = await prisma.user.findFirst({ where: { email: params.email } });
  return NextResponse.json(user);
}
