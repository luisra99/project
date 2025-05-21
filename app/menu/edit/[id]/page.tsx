// app/menu/edit/[id]/page.tsx

import OfferForm from "../../OfferForm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function EditOfferPage({
  params,
}: {
  params: { id: string };
}) {
  const offer = await prisma.menuItem.findUnique({ where: { id: params.id } });

  if (!offer)
    return <div className="text-center mt-10">Oferta no encontrada</div>;

  return <OfferForm initialData={offer} />;
}
