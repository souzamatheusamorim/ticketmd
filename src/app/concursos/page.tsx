"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard, type Product } from "@/components/product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { useSession } from "next-auth/react"

// Array simulando dados de uma API
//name type 
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
    tags: ["k-pop", "apple", "smartphone"],
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

interface Concursos {
  id: string
  name: string
  cpf: string
  email: string
  phone: string
  type: string
}

interface ApiResponse {
  data: {
    [key: string]: Concursos
  }
}

export default function Concursos() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [cart, setCart] = useState<Product[]>([])
  const [concursos, setConcursos] = useState<Concursos[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simular carregamento de API
  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setProducts(productsData)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  // Função para buscar concursos
  const fetchUsers = useCallback(async () => {
    if (!session?.user?.access_token) return

    try {
      const res = await fetch('https://dev.mundodream.com.br/contests', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.access_token}`,
        },
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data: ApiResponse = await res.json()
      const usersArray = Object.values(data.data)
      setConcursos(usersArray)
      console.log(usersArray)
    } catch (error) {
      setError("Failed to fetch users")
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Obter categorias únicas para filtros
  const categories = Array.from(new Set(concursos.map((concurso) => concurso.type)))

  // Filtrar produtos por categoria
  const filteredProducts = selectedCategory
    ? concursos.filter((concurso) => concurso.type === selectedCategory)
    : concursos

  // Função para adicionar ao carrinho
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product])
    alert(`${product.title} adicionado ao carrinho!`)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-10 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-3xl font-bold">Concursos Disponíveis</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm">Gerenciando: {cart.length} concursos</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-6 w-full">
          Explore os concursos disponíveis e gerencie suas inscrições.
        </p>

        {/* Filtros de categoria */}
        <div className="flex flex-wrap gap-2 mb-6 w-full">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"} 
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category === "federal"
                ? "Federal"
                : category === "estadual"
                  ? "Estadual"
                  : category === "municipal"
                    ? "Municipal"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </header>

      {loading ? (
        // Estado de carregamento com grid que permite até 4 colunas
        <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-full h-full">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        // Exibição dos produtos com grid que permite até 4 colunas
        <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full h-full">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12 w-full">
          <h3 className="text-xl font-medium mb-2">Nenhum concurso encontrado</h3>
          <p className="text-muted-foreground">
            Não encontramos concursos na categoria selecionada.
          </p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => setSelectedCategory(null)}
          >
            Ver todos os concursos
          </Button>
        </div>
      )}
    </div>
  )
}