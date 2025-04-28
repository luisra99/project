import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === "PUT" && typeof id == "string") {
      const { date, time, status } = req.body;
      const updated = await prisma.reservation.update({
        where: { id },
        data: { date, time, status },
      });
      return res.json(updated);
    }

    if (req.method === "DELETE" && typeof id == "string") {
      await prisma.reservation.delete({
        where: { id },
      });
      return res.status(204).end();
    }

    return res.status(405).json({ error: "Método no permitido." });
  } catch (error) {
    console.error("Error en /api/reservations/[id]:", error);
    return res
      .status(500)
      .json({ error: "Algo salió mal y no fue culpa del becario." });
  }
}
