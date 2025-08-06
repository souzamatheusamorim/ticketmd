import type { LucideIcon } from "lucide-react"
import { Card, CardHeader } from "./card"

interface StatsCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "danger"
  className?: string
}

export function StatsCard({ title, value, icon: Icon, variant = "default", className = "" }: StatsCardProps) {
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "success":
        return {
          valueColor: "text-green-600",
          iconColor: "text-green-400",
        }
      case "warning":
        return {
          valueColor: "text-yellow-600",
          iconColor: "text-yellow-400",
        }
      case "danger":
        return {
          valueColor: "text-danger",
          iconColor: "text-danger/70",
        }
      case "default":
      default:
        return {
          valueColor: "text-card-foreground",
          iconColor: "text-muted-foreground",
        }
    }
  }

  const styles = getVariantStyles(variant)

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-2xl font-bold ${styles.valueColor}`}>{value}</p>
          </div>
          <Icon className={`h-8 w-8 ${styles.iconColor}`} />
        </div>
      </CardHeader>
    </Card>
  )
}
