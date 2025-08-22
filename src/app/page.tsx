import Front from '@/components/Front'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Painel Comparativo de Dados - SP</h1>
        <p className="text-lg text-gray-600">Compare indicadores do Estado de São Paulo.</p>
      </div>
      <Front />
    </main>
  )
}