import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gerenciamento de Concursos",
  description: "Gerencie suas inscrições em concursos públicos",
}

export default function ConcursosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}

