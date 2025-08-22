"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Front() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const panels = [
    { label: "Painel Valor Adicionado por RA", path: "/dashboard/valor-adicionado" },
    { label: "Painel PIB por Ano", path: "/dashboard/pib" },
  ];

  const handleAccess = () => {
    if (selected) {
      router.push(selected);
    }
  };

  return (
    <div className="p-2 flex gap-4">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">Selecione um painel...</option>
        {panels.map((panel) => (
          <option key={panel.path} value={panel.path}>
            {panel.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleAccess}
        disabled={!selected}
        className={`px-4 py-2 rounded text-white ${
          selected ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Acessar Painel
      </button>
    </div>
  );
}
