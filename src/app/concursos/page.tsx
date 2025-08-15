"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { useSession } from "next-auth/react"


interface Concursos {
  id: string
  name: string
  type: string
  date?: string
  description?: string
}

interface ApiResponse {
  data: {
    [key: string]: Concursos
  }
}

export default function Concursos() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [concursos, setConcursos] = useState<Concursos[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Função para buscar concursos
  const fetchConcursos = useCallback(async () => {
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
      const concursosArray = Object.values(data.data)
      console.log(concursosArray)
      setConcursos(concursosArray)
    } catch (error) {
      setError("Failed to fetch concursos")
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }, [session])

  useEffect(() => {
    fetchConcursos()
  }, [fetchConcursos])

  // Obter tipos únicos para filtros
  const categories = Array.from(new Set(concursos.map((concurso) => concurso.type)))

  // Filtrar concursos por tipo
  const filteredConcursos = selectedCategory
    ? concursos.filter((concurso) => concurso.type === selectedCategory)
    : concursos

  // Função para formatar a data
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data não definida"
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
   // <AuthGuard>
      <div className="container mx-auto py-8 px-4">
        <header className="mb-10 w-full">
          <div className="flex justify-between items-center mb-6 w-full">
            <h1 className="text-3xl font-bold text-purple-999">Concursos Disponíveis</h1>
          </div>
          <p className="text-muted-foreground mb-6 w-full">
            Explore os concursos disponíveis e gerencie suas inscrições.
          </p>

          {/* Filtros de categoria */}
          <div className="flex flex-wrap gap-2 mb-6 w-full ">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              onClick={() => setSelectedCategory(null)}
              className="bg-purple-999"
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

        {isLoading ? (
          <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="w-full h-full">
                <ProductCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredConcursos.map((concurso) => (
              <div key={concurso.id} className="w-full h-full">
                <ProductCard 
                  product={{
                    id: concurso.id,
                    title: concurso.name,
                    // Adicionando propriedades extras que podem ser usadas no card
                    description: concurso.description || "Concurso disponível para inscrição",
                    date: concurso.date
                  }} 
                />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredConcursos.length === 0 && (
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
  //  </AuthGuard>
  )
}