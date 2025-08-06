"use client"

import { CalendarIcon, Trash2 } from "lucide-react"
import type { Meta } from "@/types/meta"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface MetaCardProps {
  meta: Meta
  onDelete: (id: string) => void
}

export function MetaCard({ meta, onDelete }: MetaCardProps) {
  const getStatusVariant = (status: Meta["status"]) => {
    switch (status) {
      case "concluida":
        return "success"
      case "em-andamento":
        return "default"
      case "atrasada":
        return "danger"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: Meta["status"]) => {
    switch (status) {
      case "concluida":
        return "Concluída"
      case "em-andamento":
        return "Em Andamento"
      case "atrasada":
        return "Atrasada"
      default:
        return "Indefinido"
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  return (
    <Card hover className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-1">{meta.titulo}</CardTitle>
            <CardDescription>{meta.descricao}</CardDescription>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Badge variant={getStatusVariant(meta.status)}>{getStatusText(meta.status)}</Badge>
            <button
              onClick={() => onDelete(meta.id)}
              className="text-muted-foreground hover:text-danger transition-colors p-1 rounded"
              title="Deletar meta"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Progress value={meta.progresso} />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Badge variant="secondary">{meta.categoria}</Badge>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-3 w-3" />
            {formatarData(meta.prazo)}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
