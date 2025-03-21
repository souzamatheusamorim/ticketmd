"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

// Tipo para o produto
export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  tags: string[]
}

// Props para o componente
interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

// Função para calcular o preço com desconto
const calculateDiscountedPrice = (price: number, discount: number) => {
  return (price - (price * discount) / 100).toFixed(2)
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter()

  const handleManageConcurso = () => {
    // Navegar para a página de gerenciamento do concurso usando o ID
    router.push(`/concursos/${product.id}`)
  }

  return (
    <Card className="overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center justify-center rounded-md p-3 text-primary">
          <Calendar className="h-5 w-5 mb-1" />
          <span className="text-white text-xs font-medium ">JUN</span>
          <span className="text-xl font-bold">15</span>
        </div>

        <div>
          <h3 className="font-medium">Workshop de UX Design</h3>
          <p className="text-sm text-muted-foreground mt-1">09:00 - 12:00 • Online</p>
          <p className="text-sm mt-2">Aprenda os fundamentos de UX Design e como aplicá-los em seus projetos.</p>
        </div>
      </div>
    </CardContent>

    <CardFooter className="px-6 pb-6 pt-0">
      <Button variant="outline" className="w-full">
        Ver detalhes
      </Button>
    </CardFooter>
  </Card>
  )
}

