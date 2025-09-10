"use client"

import { useState, useMemo, useCallback } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Plus,
  Phone,
  Mail,
  Building2,
  Download,
  Upload,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
  MessageSquare,
  Clock,
  Calendar,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

interface ApiResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface HistoricoContato {
  id: number
  data: string
  tipo: "ligacao" | "email" | "reuniao" | "whatsapp" | "visita"
  resultado: "nao_atendeu" | "interessado" | "nao_interessado" | "reagendou" | "proposta_enviada" | "fechou" | "perdeu"
  observacoes: string
  proximoContato?: string
}

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  empresa: string
  status: "lead" | "contato" | "proposta" | "fechado" | "perdido"
  notas: string
  dataContato: string
  valor?: number
  origem: string
  responsavel: string
  historico: HistoricoContato[]
}

const tiposContato = {
  ligacao: "Ligação",
  email: "E-mail",
  reuniao: "Reunião",
  whatsapp: "WhatsApp",
  visita: "Visita",
}

const resultadosContato = {
  nao_atendeu: "Não atendeu",
  interessado: "Interessado",
  nao_interessado: "Não interessado",
  reagendou: "Reagendou",
  proposta_enviada: "Proposta enviada",
  fechou: "Fechou negócio",
  perdeu: "Perdeu interesse",
}

const resultadoColors = {
  nao_atendeu: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  interessado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  nao_interessado: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  reagendou: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  proposta_enviada: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  fechou: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  perdeu: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
}

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Erro ao carregar dados")
  }
  return response.json()
}

const clienteAPI = {
  // Buscar clientes com filtros e paginação
  getClientes: async (params: {
    page: number
    limit: number
    search?: string
    status?: string
    origem?: string
    responsavel?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }): Promise<ApiResponse<Cliente>> => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        searchParams.append(key, String(value))
      }
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes?${searchParams}`)
    if (!response.ok) throw new Error("Erro ao buscar clientes")
    return response.json()
  },

  // Criar novo cliente
  createCliente: async (cliente: Omit<Cliente, "id" | "dataContato" | "historico">): Promise<Cliente> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    })
    if (!response.ok) throw new Error("Erro ao criar cliente")
    return response.json()
  },

  // Atualizar cliente
  updateCliente: async (id: number, cliente: Partial<Cliente>): Promise<Cliente> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    })
    if (!response.ok) throw new Error("Erro ao atualizar cliente")
    return response.json()
  },

  // Deletar cliente
  deleteCliente: async (id: number): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${id}`, {
      method: "DELETE",
      headers: {
        // "Authorization": `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Erro ao deletar cliente")
  },

  // Deletar múltiplos clientes
  deleteMultipleClientes: async (ids: number[]): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/bulk-delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    })
    if (!response.ok) throw new Error("Erro ao deletar clientes")
  },

  // Adicionar contato ao histórico
  addContato: async (clienteId: number, contato: Omit<HistoricoContato, "id" | "data">): Promise<HistoricoContato> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${clienteId}/contatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(contato),
    })
    if (!response.ok) throw new Error("Erro ao adicionar contato")
    return response.json()
  },

  // Exportar clientes
  exportClientes: async (ids?: number[]): Promise<Blob> => {
    const params = ids ? `?ids=${ids.join(",")}` : ""
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/export${params}`, {
      headers: {
        // "Authorization": `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Erro ao exportar clientes")
    return response.blob()
  },
}

const statusColors = {
  lead: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  contato: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  proposta: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  fechado: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  perdido: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
}

const statusLabels = {
  lead: "Lead",
  contato: "Em Contato",
  proposta: "Proposta Enviada",
  fechado: "Fechado",
  perdido: "Perdido",
}

export default function ClientesPage() {
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [filtroOrigem, setFiltroOrigem] = useState<string>("todas")
  const [filtroResponsavel, setFiltroResponsavel] = useState<string>("todos")
  const [busca, setBusca] = useState("")
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(20)
  const [ordenacao, setOrdenacao] = useState<{ campo: keyof Cliente; direcao: "asc" | "desc" }>({
    campo: "nome",
    direcao: "asc",
  })

  const [dialogAberto, setDialogAberto] = useState(false)
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null)
  const [clientesSelecionados, setClientesSelecionados] = useState<Set<number>>(new Set())
  const [historicoDialogAberto, setHistoricoDialogAberto] = useState(false)
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [novoContatoDialogAberto, setNovoContatoDialogAberto] = useState(false)

  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const apiParams = useMemo(
    () => ({
      page: paginaAtual,
      limit: itensPorPagina,
      search: busca || undefined,
      status: filtroStatus !== "todos" ? filtroStatus : undefined,
      origem: filtroOrigem !== "todas" ? filtroOrigem : undefined,
      responsavel: filtroResponsavel !== "todos" ? filtroResponsavel : undefined,
      sortBy: ordenacao.campo,
      sortOrder: ordenacao.direcao,
    }),
    [paginaAtual, itensPorPagina, busca, filtroStatus, filtroOrigem, filtroResponsavel, ordenacao],
  )

  const {
    data: apiResponse,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/clientes?${new URLSearchParams(Object.entries(apiParams).filter(([_, v]) => v !== undefined) as [string, string][])}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  )

  const clientes = apiResponse?.data || []
  const totalClientes = apiResponse?.total || 0
  const totalPaginas = Math.ceil(totalClientes / itensPorPagina)

  const { data: filtrosData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/clientes/filtros`, fetcher)
  const origensUnicas = filtrosData?.origens || []
  const responsaveisUnicos = filtrosData?.responsaveis || []

  const [novoContato, setNovoContato] = useState({
    tipo: "ligacao" as keyof typeof tiposContato,
    resultado: "nao_atendeu" as keyof typeof resultadosContato,
    observacoes: "",
    proximoContato: "",
  })

  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    status: "lead" as const,
    notas: "",
    valor: 0,
    origem: "Website",
    responsavel: "João Vendedor",
  })

  const handleSalvarCliente = async () => {
    try {
      if (clienteEditando) {
        setIsUpdating(true)
        await clienteAPI.updateCliente(clienteEditando.id, novoCliente)
      } else {
        setIsCreating(true)
        await clienteAPI.createCliente(novoCliente)
      }

      // Revalidar dados
      mutate()

      // Resetar formulário
      setDialogAberto(false)
      setClienteEditando(null)
      setNovoCliente({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        status: "lead",
        notas: "",
        valor: 0,
        origem: "Website",
        responsavel: "João Vendedor",
      })
    } catch (error) {
      console.error("Erro ao salvar cliente:", error)
      // Aqui você pode adicionar um toast de erro
    } finally {
      setIsCreating(false)
      setIsUpdating(false)
    }
  }

  const handleAdicionarContato = async () => {
    if (!clienteSelecionado) return

    try {
      await clienteAPI.addContato(clienteSelecionado.id, {
        tipo: novoContato.tipo,
        resultado: novoContato.resultado,
        observacoes: novoContato.observacoes,
        proximoContato: novoContato.proximoContato || undefined,
      })

      // Revalidar dados
      mutate()

      // Resetar formulário
      setNovoContatoDialogAberto(false)
      setNovoContato({
        tipo: "ligacao",
        resultado: "nao_atendeu",
        observacoes: "",
        proximoContato: "",
      })
    } catch (error) {
      console.error("Erro ao adicionar contato:", error)
    }
  }

  const handleExportarSelecionados = async () => {
    try {
      setIsExporting(true)
      const blob = await clienteAPI.exportClientes(
        clientesSelecionados.size > 0 ? Array.from(clientesSelecionados) : undefined,
      )

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "clientes.csv"
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erro ao exportar:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExcluirSelecionados = async () => {
    try {
      setIsDeleting(true)
      await clienteAPI.deleteMultipleClientes(Array.from(clientesSelecionados))

      // Revalidar dados e limpar seleção
      mutate()
      setClientesSelecionados(new Set())
    } catch (error) {
      console.error("Erro ao excluir clientes:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleExcluirCliente = async (id: number) => {
    try {
      await clienteAPI.deleteCliente(id)
      mutate()
    } catch (error) {
      console.error("Erro ao excluir cliente:", error)
    }
  }

  const handleSelecionarTodos = useCallback(() => {
    if (clientesSelecionados.size === clientes.length && clientes.length > 0) {
      setClientesSelecionados(new Set())
    } else {
      setClientesSelecionados(new Set(clientes.map((c: Cliente) => c.id)))

    }
  }, [clientes, clientesSelecionados.size])

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente)
    setNovoCliente({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      empresa: cliente.empresa,
      status: cliente.status,
      notas: cliente.notas,
      valor: cliente.valor || 0,
      origem: cliente.origem,
      responsavel: cliente.responsavel,
    })
    setDialogAberto(true)
  }

  const handleVerHistorico = (cliente: Cliente) => {
    setClienteSelecionado(cliente)
    setHistoricoDialogAberto(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando clientes...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">Erro ao carregar clientes</p>
              <Button onClick={() => mutate()}>Tentar novamente</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Clientes</h1>
            <p className="text-muted-foreground">
              {totalClientes} clientes encontrados
              {clientesSelecionados.size > 0 && ` • ${clientesSelecionados.size} selecionados`}
            </p>
          </div>

          <div className="flex gap-2">
            {clientesSelecionados.size > 0 && (
              <>
                <Button variant="outline" onClick={handleExportarSelecionados} disabled={isExporting}>
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? "Exportando..." : `Exportar (${clientesSelecionados.size})`}
                </Button>
                <Button variant="outline" onClick={handleExcluirSelecionados} disabled={isDeleting}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isDeleting ? "Excluindo..." : `Excluir (${clientesSelecionados.size})`}
                </Button>
              </>
            )}

            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>

            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{clienteEditando ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
                  <DialogDescription>
                    {clienteEditando
                      ? "Atualize as informações do cliente"
                      : "Adicione um novo cliente ao seu pipeline de vendas"}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                  {/* ... existing form fields ... */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome</Label>
                      <Input
                        id="nome"
                        value={novoCliente.nome}
                        onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                        placeholder="Nome completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        value={novoCliente.empresa}
                        onChange={(e) => setNovoCliente({ ...novoCliente, empresa: e.target.value })}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={novoCliente.email}
                        onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={novoCliente.telefone}
                        onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={novoCliente.status}
                        onValueChange={(value: any) => setNovoCliente({ ...novoCliente, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lead">Lead</SelectItem>
                          <SelectItem value="contato">Em Contato</SelectItem>
                          <SelectItem value="proposta">Proposta Enviada</SelectItem>
                          <SelectItem value="fechado">Fechado</SelectItem>
                          <SelectItem value="perdido">Perdido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="origem">Origem</Label>
                      <Select
                        value={novoCliente.origem}
                        onValueChange={(value) => setNovoCliente({ ...novoCliente, origem: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {origensUnicas.map((origem: string) => (
                            <SelectItem key={origem} value={origem}>
                              {origem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor Potencial</Label>
                      <Input
                        id="valor"
                        type="number"
                        value={novoCliente.valor}
                        onChange={(e) => setNovoCliente({ ...novoCliente, valor: Number(e.target.value) })}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="responsavel">Responsável</Label>
                    <Select
                      value={novoCliente.responsavel}
                      onValueChange={(value) => setNovoCliente({ ...novoCliente, responsavel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {responsaveisUnicos.map((responsavel: string) => (
                          <SelectItem key={responsavel} value={responsavel}>
                            {responsavel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notas">Notas</Label>
                    <Textarea
                      id="notas"
                      value={novoCliente.notas}
                      onChange={(e) => setNovoCliente({ ...novoCliente, notas: e.target.value })}
                      placeholder="Observações sobre o cliente..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDialogAberto(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSalvarCliente}
                    className="bg-primary hover:bg-primary/90"
                    disabled={isCreating || isUpdating}
                  >
                    {isCreating || isUpdating
                      ? clienteEditando
                        ? "Atualizando..."
                        : "Salvando..."
                      : clienteEditando
                        ? "Atualizar"
                        : "Salvar"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ... existing filters card ... */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por nome, empresa, email ou telefone..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="contato">Em Contato</SelectItem>
                  <SelectItem value="proposta">Proposta Enviada</SelectItem>
                  <SelectItem value="fechado">Fechado</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroOrigem} onValueChange={setFiltroOrigem}>
                <SelectTrigger>
                  <SelectValue placeholder="Origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Origens</SelectItem>
                  {origensUnicas.map((origem: string) => (
                    <SelectItem key={origem} value={origem}>
                      {origem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filtroResponsavel} onValueChange={setFiltroResponsavel}>
                <SelectTrigger>
                  <SelectValue placeholder="Responsável" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Responsáveis</SelectItem>
                  {responsaveisUnicos.map((responsavel: string) => (
                    <SelectItem key={responsavel} value={responsavel}>
                      {responsavel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ... existing table with updated data source ... */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-4 text-left">
                      <Checkbox
                        checked={clientesSelecionados.size === clientes.length && clientes.length > 0}
                        onCheckedChange={handleSelecionarTodos}
                      />
                    </th>
                    <th
                      className="p-4 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() =>
                        setOrdenacao({
                          campo: "nome",
                          direcao: ordenacao.campo === "nome" && ordenacao.direcao === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Cliente
                    </th>
                    <th className="p-4 text-left font-medium">Contato</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Último Contato</th>
                    <th
                      className="p-4 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() =>
                        setOrdenacao({
                          campo: "valor",
                          direcao: ordenacao.campo === "valor" && ordenacao.direcao === "desc" ? "asc" : "desc",
                        })
                      }
                    >
                      Valor
                    </th>
                    <th className="p-4 text-left font-medium">Origem</th>
                    <th className="p-4 text-left font-medium">Responsável</th>
                    <th className="p-4 text-left font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente: Cliente) => {
                    const ultimoContato =
                      cliente.historico?.length > 0 ? cliente.historico[cliente.historico.length - 1] : null

                    return (
                      <tr key={cliente.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <Checkbox
                            checked={clientesSelecionados.has(cliente.id)}
                            onCheckedChange={(checked) => {
                              const newSet = new Set(clientesSelecionados)
                              if (checked) {
                                newSet.add(cliente.id)
                              } else {
                                newSet.delete(cliente.id)
                              }
                              setClientesSelecionados(newSet)
                            }}
                          />
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium">{cliente.nome}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              {cliente.empresa}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="text-sm flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {cliente.email}
                            </div>
                            <div className="text-sm flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {cliente.telefone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={statusColors[cliente.status]}>{statusLabels[cliente.status]}</Badge>
                        </td>
                        <td className="p-4">
                          {ultimoContato ? (
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {tiposContato[ultimoContato.tipo]} -{" "}
                                {new Date(ultimoContato.data).toLocaleDateString("pt-BR")}
                              </div>
                              <Badge className={`text-xs ${resultadoColors[ultimoContato.resultado]}`}>
                                {resultadosContato[ultimoContato.resultado]}
                              </Badge>
                              {ultimoContato.proximoContato && (
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Próximo: {new Date(ultimoContato.proximoContato).toLocaleDateString("pt-BR")}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Nenhum contato</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-medium">
                            {cliente.valor ? `R$ ${cliente.valor.toLocaleString("pt-BR")}` : "-"}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{cliente.origem}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{cliente.responsavel}</span>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleVerHistorico(cliente)}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Ver Histórico ({cliente.historico?.length || 0})
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setClienteSelecionado(cliente)
                                  setNovoContatoDialogAberto(true)
                                }}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Novo Contato
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleEditarCliente(cliente)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleExcluirCliente(cliente.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Itens por página:</span>
                <Select
                  value={String(itensPorPagina)}
                  onValueChange={(value) => {
                    setItensPorPagina(Number(value))
                    setPaginaAtual(1)
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {(paginaAtual - 1) * itensPorPagina + 1} - {Math.min(paginaAtual * itensPorPagina, totalClientes)} de{" "}
                  {totalClientes}
                </span>

                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPaginaAtual((prev) => Math.max(1, prev - 1))}
                    disabled={paginaAtual === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPaginaAtual((prev) => Math.min(totalPaginas, prev + 1))}
                    disabled={paginaAtual === totalPaginas}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ... existing dialogs ... */}
        <Dialog open={historicoDialogAberto} onOpenChange={setHistoricoDialogAberto}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Histórico de Contatos - {clienteSelecionado?.nome}</DialogTitle>
              <DialogDescription>Visualize todo o histórico de interações com este cliente</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {!clienteSelecionado?.historico || clienteSelecionado.historico.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum contato registrado ainda</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {clienteSelecionado.historico.map((contato) => (
                    <Card key={contato.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{tiposContato[contato.tipo]}</Badge>
                            <Badge className={resultadoColors[contato.resultado]}>
                              {resultadosContato[contato.resultado]}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(contato.data).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          {contato.observacoes && <p className="text-sm">{contato.observacoes}</p>}
                          {contato.proximoContato && (
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Próximo contato: {new Date(contato.proximoContato).toLocaleDateString("pt-BR")}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => {
                  setNovoContatoDialogAberto(true)
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Contato
              </Button>
              <Button variant="outline" onClick={() => setHistoricoDialogAberto(false)}>
                Fechar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={novoContatoDialogAberto} onOpenChange={setNovoContatoDialogAberto}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Registrar Novo Contato</DialogTitle>
              <DialogDescription>Registre o resultado do contato com {clienteSelecionado?.nome}</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Contato</Label>
                  <Select
                    value={novoContato.tipo}
                    onValueChange={(value: keyof typeof tiposContato) =>
                      setNovoContato({ ...novoContato, tipo: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(tiposContato).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultado">Resultado</Label>
                  <Select
                    value={novoContato.resultado}
                    onValueChange={(value: keyof typeof resultadosContato) =>
                      setNovoContato({ ...novoContato, resultado: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(resultadosContato).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={novoContato.observacoes}
                  onChange={(e) => setNovoContato({ ...novoContato, observacoes: e.target.value })}
                  placeholder="Descreva o que aconteceu durante o contato..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proximoContato">Próximo Contato (opcional)</Label>
                <Input
                  id="proximoContato"
                  type="date"
                  value={novoContato.proximoContato}
                  onChange={(e) => setNovoContato({ ...novoContato, proximoContato: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNovoContatoDialogAberto(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAdicionarContato} className="bg-primary hover:bg-primary/90">
                Registrar Contato
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
