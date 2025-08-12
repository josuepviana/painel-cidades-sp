
import Auth from '@/components/Auth'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Painel Comparativo de Cidades - SP</h1>
      <p className="mb-4">Compare indicadores de municípios do Estado de São Paulo.</p>
      <Auth />
    </main>
  )
}

