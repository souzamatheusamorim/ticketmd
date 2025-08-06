"use client"

import { useState, useEffect } from "react"
import { Plus, Target } from "lucide-react"
import type { Meta, NovaMetaForm, MetasEstatisticas } from "@/types/meta"
import { EstatisticasCard } from "@/components/estatisticas-card"
import { MetaCard } from "@/components/meta-card"
import { ModalNovaMeta } from "@/components/modal-nova-meta"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"

// Dados fake simulando uma API
const metasFakeIniciais: Meta[] = [
  {
    id: "1",
    titulo: "Aprender React",
    descricao: "Completar curso de React e construir 3 projetos práticos",
    categoria: "Educação",
    prazo: "2024-12-31",
    progresso: 65,
    status: "em-andamento",
    criadaEm: "2024-01-15",
  },
  {
    id: "2",
    titulo: "Exercitar-se regularmente",
    descricao: "Fazer exercícios 4 vezes por semana durante 3 meses",
    categoria: "Saúde",
    prazo: "2024-06-30",
    progresso: 100,
    status: "concluida",
    criadaEm: "2024-03-01",
  },
  {
    id: "3",
    titulo: "Economizar R$ 5.000",
    descricao: "Guardar dinheiro para viagem de férias",
    categoria: "Financeiro",
    prazo: "2024-08-15",
    progresso: 30,
    status: "atrasada",
    criadaEm: "2024-02-10",
  },
  {
    id: "4",
    titulo: "Ler 12 livros",
    descricao: "Ler um livro por mês durante o ano todo",
    categoria: "Pessoal",
    prazo: "2024-12-31",
    progresso: 45,
    status: "em-andamento",
    criadaEm: "2024-01-01",
  },
  {
    id: "5",
    titulo: "Aprender violão",
    descricao: "Conseguir tocar 10 músicas completas",
    categoria: "Hobby",
    prazo: "2024-09-30",
    progresso: 80,
    status: "em-andamento",
    criadaEm: "2024-02-15",
  },
]

// Simula delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [loading, setLoading] = useState(true)
  const [criandoMeta, setCriandoMeta] = useState(false)

  // Simular carregamento inicial
  useEffect(() => {
    const carregarMetas = async () => {
      await delay(500)
      setMetas(metasFakeIniciais)
      setLoading(false)
    }
    carregarMetas()
  }, [])

  const criarNovaMeta = async (novaMetaForm: NovaMetaForm) => {
    try {
      setCriandoMeta(true)
      await delay(300) // Simula delay da API

      const novaMeta: Meta = {
        ...novaMetaForm,
        id: Date.now().toString(),
        progresso: 0,
        status: "em-andamento",
        criadaEm: new Date().toISOString().split("T")[0],
      }

      setMetas([...metas, novaMeta])
      setModalAberto(false)
    } catch (error) {
      console.error("Erro ao criar meta:", error)
    } finally {
      setCriandoMeta(false)
    }
  }

  const deletarMeta = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta meta?")) return

    try {
      await delay(200) // Simula delay da API
      setMetas(metas.filter((meta) => meta.id !== id))
    } catch (error) {
      console.error("Erro ao deletar meta:", error)
    }
  }

  const calcularEstatisticas = (): MetasEstatisticas => {
    return {
      total: metas.length,
      concluidas: metas.filter((m) => m.status === "concluida").length,
      emAndamento: metas.filter((m) => m.status === "em-andamento").length,
      atrasadas: metas.filter((m) => m.status === "atrasada").length,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Target className="h-8 w-8 text-blue" />
              Minhas Metas
            </h1>
            <p className="text-muted-foreground mt-1">Acompanhe e gerencie seus objetivos</p>
          </div>

          <button
            onClick={() => setModalAberto(true)}
            className="flex items-center gap-2 bg-blue hover:bg-blue/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Nova Meta
          </button>
        </div>

        {/* Estatísticas */}
        <EstatisticasCard estatisticas={calcularEstatisticas()} />

        {/* Lista de Metas */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Suas Metas</h2>

          {metas.length === 0 ? (
            <EmptyState onCreateFirst={() => setModalAberto(true)} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {metas.map((meta) => (
                <MetaCard key={meta.id} meta={meta} onDelete={deletarMeta} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <ModalNovaMeta
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSubmit={criarNovaMeta}
        isLoading={criandoMeta}
      />
    </div>
  )
}
