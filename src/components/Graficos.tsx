"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  data: Array<{ RA: string; Ano: number; Categoria: string; Valor: number | string }>;
  year: number;                
  mode?: "stacked" | "grouped"; 
  height?: number;
  sortBy?: "Serviços" | "Indústria" | "Agropecuária" | "RA";
};

export default function Graficos({
  title,
  data,
  year,
  mode = "stacked",
  height = 520,
  sortBy = "RA",
}: Props) {
  const filtered = (data || []).filter((d) => Number(d.Ano) === Number(year));

  // pivot -> um objeto por RA com as 3 categorias como colunas
  const map = new Map<string, any>();
  for (const d of filtered) {
    const ra = String(d.RA).trim();
    if (!map.has(ra)) {
      map.set(ra, { RA: ra, Agropecuária: 0, Indústria: 0, Serviços: 0 });
    }
    const row = map.get(ra);
    const cat = String(d.Categoria).trim();
    const val = Number(d.Valor) || 0;
    if (cat in row) row[cat] = val;
  }
  const wide = Array.from(map.values());

  wide.sort((a, b) => {
    if (sortBy === "RA") return a.RA.localeCompare(b.RA, "pt-BR");
    return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
  });

  const isStacked = mode === "stacked";
  const dynamicHeight = Math.max(height, wide.length * 40);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">
        {title} — {year}
      </h2>

      <ResponsiveContainer width="100%" height={dynamicHeight}>
        <BarChart
          data={wide}
          layout="vertical"
          margin={{ top: 16, right: 24, bottom: 8, left: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="RA"
            width={220}
          />
          <Tooltip formatter={(v: any) => `${v}%`} />
          <Legend />

          <Bar
            dataKey="Agropecuária"
            stackId={isStacked ? "va" : undefined}
            fill="#82ca9d"
          />
          <Bar
            dataKey="Indústria"
            stackId={isStacked ? "va" : undefined}
            fill="#8884d8"
          />
          <Bar
            dataKey="Serviços"
            stackId={isStacked ? "va" : undefined}
            fill="#ffc658"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}