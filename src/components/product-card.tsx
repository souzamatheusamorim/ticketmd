"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product)
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="h-[200px] overflow-hidden bg-muted">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{product.title}</CardTitle>
          <Badge variant="outline">{product.brand}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex gap-2 mb-4 flex-wrap">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{product.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">{product.stock} em estoque</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t pt-4">
        <div className="flex items-center gap-2 mb-3 w-full">
          <span className="text-2xl font-bold">
            R$ {calculateDiscountedPrice(product.price, product.discountPercentage)}
          </span>
          {product.discountPercentage > 0 && (
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground line-through">R$ {product.price.toFixed(2)}</span>
              <Badge variant="destructive" className="text-xs">
                -{product.discountPercentage}%
              </Badge>
            </div>
          )}
        </div>
        <Button className="w-full" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}

