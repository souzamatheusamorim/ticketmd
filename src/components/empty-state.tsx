"use client"

import { Target, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface EmptyStateProps {
  onCreateFirst: () => void
}

export function EmptyState({ onCreateFirst }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="py-12">
        <div className="text-center">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">Nenhuma meta encontrada</h3>
          <p className="text-muted-foreground mb-4">Comece criando sua primeira meta para acompanhar seu progresso.</p>
          <button
            onClick={onCreateFirst}
            className="inline-flex items-center gap-2 bg-blue hover:bg-blue/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            Criar Primeira Meta
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
