export interface Meta {
  id: string
  titulo: string
  descricao: string
  categoria: string
  prazo: string
  progresso: number
  status: "em-andamento" | "concluida" | "atrasada"
  criadaEm: string
}

export interface NovaMetaForm {
  titulo: string
  descricao: string
  categoria: string
  prazo: string
}

export interface MetasEstatisticas {
  total: number
  concluidas: number
  emAndamento: number
  atrasadas: number
}
