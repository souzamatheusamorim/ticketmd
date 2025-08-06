"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"
import type { NovaMetaForm } from "@/types/meta"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

interface ModalNovaMetaProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (meta: NovaMetaForm) => void
  isLoading?: boolean
}

export function ModalNovaMeta({ isOpen, onClose, onSubmit, isLoading = false }: ModalNovaMetaProps) {
  const [form, setForm] = useState<NovaMetaForm>({
    titulo: "",
    descricao: "",
    categoria: "",
    prazo: "",
  })

  const categorias = ["Educação", "Saúde", "Financeiro", "Carreira", "Pessoal", "Hobby"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.titulo || !form.categoria || !form.prazo) return

    onSubmit(form)
    setForm({ titulo: "", descricao: "", categoria: "", prazo: "" })
  }

  const handleClose = () => {
    setForm({ titulo: "", descricao: "", categoria: "", prazo: "" })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle>Criar Nova Meta</CardTitle>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-card-foreground transition-colors"
                disabled={isLoading}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-card-foreground mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  id="titulo"
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                  placeholder="Ex: Aprender uma nova habilidade"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium text-card-foreground mb-1">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  placeholder="Descreva sua meta em detalhes..."
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-card-foreground mb-1">
                  Categoria *
                </label>
                <select
                  id="categoria"
                  value={form.categoria}
                  onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                  disabled={isLoading}
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="prazo" className="block text-sm font-medium text-card-foreground mb-1">
                  Prazo *
                </label>
                <input
                  type="date"
                  id="prazo"
                  value={form.prazo}
                  onChange={(e) => setForm({ ...form, prazo: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-muted-foreground bg-secondary hover:bg-secondary/80 rounded-md font-medium transition-colors"
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue hover:bg-blue/90 text-white rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !form.titulo || !form.categoria || !form.prazo}
                >
                  {isLoading ? "Criando..." : "Criar Meta"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
