import { Target, CheckCircle, TrendingUp, Clock } from "lucide-react"
import type { MetasEstatisticas } from "@/types/meta"
import { StatsCard } from "@/components/ui/stats-card"

interface EstatisticasCardProps {
  estatisticas: MetasEstatisticas
}

export function EstatisticasCard({ estatisticas }: EstatisticasCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard title="Total de Metas" value={estatisticas.total} icon={Target} variant="default" />

      <StatsCard title="Concluídas" value={estatisticas.concluidas} icon={CheckCircle} variant="success" />

      <StatsCard title="Em Andamento" value={estatisticas.emAndamento} icon={TrendingUp} variant="default" />

      <StatsCard title="Atrasadas" value={estatisticas.atrasadas} icon={Clock} variant="danger" />
    </div>
  )
}
