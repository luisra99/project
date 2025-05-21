import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });

  // Aquí deberías hashear la contraseña (por simplicidad, no lo hago)
  // Usa bcrypt o similar en producción

  const user = await prisma.user.create({
    data: {
      email,
      password, // NO HACER ESTO EN PRODUCCIÓN SIN HASH
      role: "GUEST",
      name: email,
    },
  });

  return NextResponse.json({ email: user.email, id: user.id });
}
