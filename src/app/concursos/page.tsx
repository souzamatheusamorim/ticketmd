"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard, type Product } from "@/components/product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"

// Array simulando dados de uma API
const productsData: Product[] = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Um smartphone Apple com câmera de última geração e processador A16 Bionic",
    price: 999.99,
    discountPercentage: 8.5,
    rating: 4.8,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "apple", "smartphone"],
  },
  {
    id: 2,
    title: "MacBook Air M2",
    description: "Notebook ultrafino com o poderoso chip M2 e bateria de longa duração",
    price: 1299.99,
    discountPercentage: 5.0,
    rating: 4.9,
    stock: 22,
    brand: "Apple",
    category: "laptops",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "apple", "laptop"],
  },
  {
    id: 3,
    title: "Samsung Galaxy S23",
    description: "Smartphone Android com câmera de 108MP e tela AMOLED de 120Hz",
    price: 899.99,
    discountPercentage: 12.0,
    rating: 4.7,
    stock: 45,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "samsung", "smartphone"],
  },
  {
    id: 4,
    title: "Sony WH-1000XM5",
    description: "Fones de ouvido com cancelamento de ruído de última geração",
    price: 349.99,
    discountPercentage: 15.0,
    rating: 4.9,
    stock: 18,
    brand: "Sony",
    category: "headphones",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "sony", "audio"],
  },
  {
    id: 5,
    title: "Dell XPS 15",
    description: "Notebook premium com tela InfinityEdge e processador Intel Core i9",
    price: 1799.99,
    discountPercentage: 7.0,
    rating: 4.6,
    stock: 12,
    brand: "Dell",
    category: "laptops",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "dell", "laptop"],
  },
  {
    id: 6,
    title: "iPad Pro 12.9",
    description: "Tablet profissional com tela Liquid Retina XDR e chip M2",
    price: 1099.99,
    discountPercentage: 10.0,
    rating: 4.8,
    stock: 27,
    brand: "Apple",
    category: "tablets",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "apple", "tablet"],
  },
  {
    id: 7,
    title: "Canon EOS R5",
    description: "Câmera mirrorless profissional com gravação de vídeo 8K",
    price: 3899.99,
    discountPercentage: 3.0,
    rating: 4.9,
    stock: 8,
    brand: "Canon",
    category: "cameras",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "canon", "camera"],
  },
  {
    id: 8,
    title: 'LG OLED C2 65"',
    description: "Smart TV OLED 4K com tecnologia de ponta para imagens perfeitas",
    price: 1999.99,
    discountPercentage: 20.0,
    rating: 4.7,
    stock: 15,
    brand: "LG",
    category: "tvs",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["premium", "lg", "tv"],
  },
]

export default function Concursos() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<Product[]>([])

  // Simular carregamento de API
  useEffect(() => {
    const fetchProducts = async () => {
      // Simulando um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProducts(productsData)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  // Obter categorias únicas para filtros
  const categories = Array.from(new Set(productsData.map((product) => product.category)))

  // Filtrar produtos por categoria
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products

  // Função para adicionar ao carrinho
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product])
    alert(`${product.title} adicionado ao carrinho!`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Nossos Produtos</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Carrinho: {cart.length} itens</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-6">
          Explore nossa seleção de produtos premium com os melhores preços do mercado.
        </p>

        {/* Filtros de categoria */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant={selectedCategory === null ? "default" : "outline"} onClick={() => setSelectedCategory(null)}>
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </header>

      {loading ? (
        // Estado de carregamento
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        // Exibição dos produtos
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">Nenhum produto encontrado</h3>
          <p className="text-muted-foreground">Não encontramos produtos na categoria selecionada.</p>
          <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory(null)}>
            Ver todos os produtos
          </Button>
        </div>
      )}
    </div>
  )
}

