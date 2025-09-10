import type { Meta } from "@/types/meta"

// Dados fake simulando uma API
const metasFake: Meta[] = [
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

export const metasApi = {
  // Buscar todas as metas
  async buscarMetas(): Promise<Meta[]> {
    await delay(500) // Simula delay da API
    return [...metasFake]
  },

  // Criar nova meta
  async criarMeta(novaMeta: Omit<Meta, "id" | "progresso" | "status" | "criadaEm">): Promise<Meta> {
    await delay(300)

    const meta: Meta = {
      ...novaMeta,
      id: Date.now().toString(),
      progresso: 0,
      status: "em-andamento",
      criadaEm: new Date().toISOString().split("T")[0],
    }

    metasFake.push(meta)
    return meta
  },

  // Deletar meta
  async deletarMeta(id: string): Promise<void> {
    await delay(200)

    const metaIndex = metasFake.findIndex((m) => m.id === id)
    if (metaIndex === -1) throw new Error("Meta não encontrada")

    metasFake.splice(metaIndex, 1)
  },
}
