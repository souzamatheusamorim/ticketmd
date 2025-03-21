import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cadastro para Competição de Cosplay | Mundo Dream",
  description: "Formulário de inscrição para a competição de cosplay do Mundo Dream",
}

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background py-8">{children}</div>
}

