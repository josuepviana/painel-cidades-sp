"use client";
import { useEffect, useState } from "react";
import { fetchXlsx } from '@/lib/xlsxParse';
import Graficos from "@/components/Graficos";

export default function Dashboard() {
    const [pibData, setPibData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchXlsx('/pib.xlsx')
            .then(data => {
                console.log("Dados carregados:", data);

                const transformedData = data
                    .filter(item => item["Tabela 3"] && item["Tabela 3"].trim().startsWith("RA")) // Filtra apenas linhas com regiões administrativas
                    .map(item => ({
                        Município: item["Tabela 3"].trim(), // Nome da região
                        Total: item["__EMPTY_3"] || 0 // Valor do PIB em 2020 (coluna correspondente)
                    }));

                console.log("Dados transformados:", transformedData);
                setPibData(transformedData);
            })
            .catch(err => console.error("Erro ao carregar dados:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard de Indicadores</h1>
            {loading ? (
                <p>Carregando dados...</p>
            ) : (
                <Graficos title="PIB dos Municípios" data={pibData} xKey="Município" yKey="Total" />
            )}
        </div>
    );
}