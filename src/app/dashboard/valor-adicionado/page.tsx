"use client";
import { useEffect, useState } from "react";
import { fetchXlsx } from '@/lib/xlsxParse';
import Graficos from "@/components/Graficos";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [pibData, setPibData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchXlsx('/pib.xlsx')
            .then(data => {
                const transformedData: any[] = [];

                data.forEach(item => {
                    if (item["Tabela 3"] && item["Tabela 3"].trim().startsWith("RA ")) {
                        const RA = item["Tabela 3"].trim();

                        // 2020
                        transformedData.push({ RA, Ano: 2020, Categoria: "Agropecuária", Valor: item["__EMPTY"] || 0 });
                        transformedData.push({ RA, Ano: 2020, Categoria: "Indústria",   Valor: item["__EMPTY_1"] || 0 });
                        transformedData.push({ RA, Ano: 2020, Categoria: "Serviços",    Valor: item["__EMPTY_2"] || 0 });

                        // 2021
                        transformedData.push({ RA, Ano: 2021, Categoria: "Agropecuária", Valor: item["__EMPTY_4"] || 0 });
                        transformedData.push({ RA, Ano: 2021, Categoria: "Indústria",   Valor: item["__EMPTY_5"] || 0 });
                        transformedData.push({ RA, Ano: 2021, Categoria: "Serviços",    Valor: item["__EMPTY_6"] || 0 });

                        // 2022
                        transformedData.push({ RA, Ano: 2022, Categoria: "Agropecuária", Valor: item["__EMPTY_8"] || 0 });
                        transformedData.push({ RA, Ano: 2022, Categoria: "Indústria",   Valor: item["__EMPTY_9"] || 0 });
                        transformedData.push({ RA, Ano: 2022, Categoria: "Serviços",    Valor: item["__EMPTY_10"] || 0 });

                        // 2023
                        transformedData.push({ RA, Ano: 2023, Categoria: "Agropecuária", Valor: item["__EMPTY_12"] || 0 });
                        transformedData.push({ RA, Ano: 2023, Categoria: "Indústria",   Valor: item["__EMPTY_13"] || 0 });
                        transformedData.push({ RA, Ano: 2023, Categoria: "Serviços",    Valor: item["__EMPTY_14"] || 0 });

                        // 2024
                        transformedData.push({ RA, Ano: 2024, Categoria: "Agropecuária", Valor: item["__EMPTY_16"] || 0 });
                        transformedData.push({ RA, Ano: 2024, Categoria: "Indústria",   Valor: item["__EMPTY_17"] || 0 });
                        transformedData.push({ RA, Ano: 2024, Categoria: "Serviços",    Valor: item["__EMPTY_18"] || 0 });
                    }
                });
                setPibData(transformedData);
            })
            .catch(err => console.error("Erro ao carregar dados:", err))
            .finally(() => setLoading(false));
    }, []);

    const years = Array.from(new Set(pibData.map((d) => d.Ano)));
    const handleGoBack = () => {
      router.push('/');
    };
    
    return (
    <div className="p-8">
        <div className="text-center py-6">
            <header>
            <h1 className="text-3xl font-bold">Dashboard de Indicadores</h1>
            </header>            
            <button 
                onClick={handleGoBack}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Voltar    
            </button>
        </div>
        <main className="max-w-7xl mx-auto px-6">
        {loading ? (
        <p>Carregando dados...</p>
        ) : (
            years.map((y) => (
                <Graficos
                key={y}
                title="Estrutura do Valor Adicionado (%) — RAs"
                data={pibData}
                year={y}
                mode="stacked"     
                sortBy="RA"
                height={Math.max(380, years.length > 1 ? 520 : 460)}
                />
            ))
        )}
        </main>
    </div>
    );

}