// components/product-card.tsx
"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

// Tipo para o concurso
export type Concurso = {
  id: string 
  title: string
  type?: string
  date?: string // Adicione esta propriedade se existir na API
  description?: string // Adicione esta propriedade se existir na API
}

// Props para o componente
interface ProductCardProps {
  product: Concurso // Mudamos para usar o tipo Concurso
  onAddToCart?: (product: Concurso) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()

  const handleManageConcurso = () => {
    router.push(`/concursos/${product.id}`)
  }

  // Função para formatar a data (se existir)
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data não definida"
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center justify-center rounded-md p-3 text-primary">
            <Calendar className="h-5 w-5 mb-1" />
            <span className="text-white text-xs font-medium">
              {product.date ? new Date(product.date).toLocaleString('pt-BR', { month: 'short' }).toUpperCase() : '---'}
            </span>
            <span className="text-xl font-bold">
              {product.date ? new Date(product.date).getDate() : '--'}
            </span>
          </div>

          <div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {product.type} • {product.date ? formatDate(product.date) : 'Data não definida'}
            </p>
            {product.description && (
              <p className="text-sm mt-2">{product.description}</p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0">
        <Button 
          variant="outline" 
          className="w-full bg-purple-999 text-gray-100"
          onClick={handleManageConcurso}
        
        >
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}