// components/OfferForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OfferForm({ initialData }: { initialData?: any }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price || 0);
  const [category, setCategory] = useState(initialData?.category || "Entradas");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = { name, description, price: Number(price), category };

    const res = await fetch(
      isEdit ? `/api/menu/${initialData.id}` : "/api/menu",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      router.refresh();
      router.push("/menu");
    } else {
      alert("Hubo un error");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">
        {isEdit ? "Editar Oferta" : "Crear Nueva Oferta"}
      </h2>

      <div>
        <label className="block mb-1 font-medium">Nombre</label>
        <input
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Descripción</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Precio</label>
        <input
          type="number"
          step="0.01"
          className="w-full border px-3 py-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Categoría</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Entradas</option>
          <option>Platos</option>
          <option>Postres</option>
          <option>Bebidas</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Guardando..." : isEdit ? "Guardar Cambios" : "Crear Oferta"}
      </button>
    </form>
  );
}
