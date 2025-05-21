// components/DeleteButton.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ offerId }: { offerId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    const res = await fetch(`/api/menu/${offerId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      router.push("/menu");
    } else {
      alert("Error al eliminar la oferta");
    }

    setLoading(false);
  };

  return (
    <div className="inline-block">
      {confirming ? (
        <div className="flex gap-2 items-center">
          <span className="text-sm">¿Seguro?</span>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Sí"}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="text-red-600 hover:underline text-sm"
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
