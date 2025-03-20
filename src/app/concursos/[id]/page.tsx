"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, FileText, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/components/product-card"

// Array simulando dados de uma API (mesmo do arquivo page.tsx)
const productsData: Product[] = [
  {
    id: 1,
    title: "Concurso Prefeitura de São Paulo",
    description: "Concurso para cargos administrativos na Prefeitura de São Paulo",
    price: 999.99,
    discountPercentage: 8.5,
    rating: 4.8,
    stock: 34,
    brand: "Administrativo",
    category: "municipal",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["prefeitura", "são paulo", "administrativo"],
  },
  {
    id: 2,
    title: "Concurso TRT 2ª Região",
    description: "Concurso para analista judiciário no Tribunal Regional do Trabalho",
    price: 1299.99,
    discountPercentage: 5.0,
    rating: 4.9,
    stock: 22,
    brand: "Judiciário",
    category: "federal",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["tribunal", "judiciário", "analista"],
  },
  {
    id: 3,
    title: "Concurso Polícia Civil SP",
    description: "Concurso para investigador da Polícia Civil do Estado de São Paulo",
    price: 899.99,
    discountPercentage: 12.0,
    rating: 4.7,
    stock: 45,
    brand: "Segurança",
    category: "estadual",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["polícia", "segurança", "investigador"],
  },
  {
    id: 4,
    title: "Concurso Banco do Brasil",
    description: "Concurso para escriturário do Banco do Brasil com vagas em todo país",
    price: 349.99,
    discountPercentage: 15.0,
    rating: 4.9,
    stock: 18,
    brand: "Bancário",
    category: "federal",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["banco", "escriturário", "financeiro"],
  },
  {
    id: 5,
    title: "Concurso INSS",
    description: "Concurso para técnico do seguro social no Instituto Nacional do Seguro Social",
    price: 1799.99,
    discountPercentage: 7.0,
    rating: 4.6,
    stock: 12,
    brand: "Previdência",
    category: "federal",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["inss", "técnico", "previdência"],
  },
  {
    id: 6,
    title: "Concurso Secretaria de Educação",
    description: "Concurso para professores da rede estadual de ensino",
    price: 1099.99,
    discountPercentage: 10.0,
    rating: 4.8,
    stock: 27,
    brand: "Educação",
    category: "estadual",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["professor", "educação", "ensino"],
  },
  {
    id: 7,
    title: "Concurso Receita Federal",
    description: "Concurso para auditor fiscal da Receita Federal do Brasil",
    price: 1499.99,
    discountPercentage: 5.0,
    rating: 4.9,
    stock: 15,
    brand: "Fiscal",
    category: "federal",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["receita", "auditor", "fiscal"],
  },
  {
    id: 8,
    title: "Concurso Tribunal de Justiça",
    description: "Concurso para escrevente do Tribunal de Justiça",
    price: 1199.99,
    discountPercentage: 8.0,
    rating: 4.7,
    stock: 20,
    brand: "Judiciário",
    category: "estadual",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["tribunal", "escrevente", "judiciário"],
  },
]

// Dados fictícios adicionais para a página de detalhes
const concursoDetails = {
  inscricaoAte: "2025-06-30",
  dataProva: "2025-08-15",
  localProva: "Múltiplas cidades",
  vagas: 150,
  salarioInicial: "R$ 5.500,00",
  requisitos: "Ensino superior completo na área",
  etapas: ["Prova objetiva", "Prova discursiva", "Avaliação de títulos", "Exame médico"],
  documentos: ["RG e CPF", "Comprovante de residência", "Diploma de graduação", "Comprovante de pagamento"],
}

export default function ConcursoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [concurso, setConcurso] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular busca do concurso pelo ID
    const fetchConcurso = async () => {
      // Simulando um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const id = Number.parseInt(params.id)
      const foundConcurso = productsData.find((p) => p.id === id)

      if (foundConcurso) {
        setConcurso(foundConcurso)
      }

      setLoading(false)
    }

    fetchConcurso()
  }, [params.id])

  const handleVoltar = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={handleVoltar}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-full max-w-md mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full mb-6" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!concurso) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={handleVoltar}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Concurso não encontrado</h1>
        </div>

        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">O concurso que você está procurando não foi encontrado.</p>
              <Button onClick={handleVoltar}>Voltar para a lista de concursos</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={handleVoltar}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{concurso.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{concurso.title}</CardTitle>
                  <CardDescription>{concurso.description}</CardDescription>
                </div>
                <Badge variant="outline">{concurso.brand}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img
                  src={concurso.thumbnail || "/placeholder.svg"}
                  alt={concurso.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>

              <Tabs defaultValue="informacoes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="informacoes">Informações</TabsTrigger>
                  <TabsTrigger value="etapas">Etapas</TabsTrigger>
                  <TabsTrigger value="documentos">Documentos</TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Inscrições até</p>
                        <p className="text-sm text-muted-foreground">{concursoDetails.inscricaoAte}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Data da prova</p>
                        <p className="text-sm text-muted-foreground">{concursoDetails.dataProva}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Local da prova</p>
                        <p className="text-sm text-muted-foreground">{concursoDetails.localProva}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 border rounded-md">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Vagas disponíveis</p>
                        <p className="text-sm text-muted-foreground">{concursoDetails.vagas}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Requisitos</h3>
                    <p className="text-sm text-muted-foreground">{concursoDetails.requisitos}</p>
                  </div>
                </TabsContent>

                <TabsContent value="etapas" className="mt-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Etapas do concurso</h3>
                    <ul className="space-y-2">
                      {concursoDetails.etapas.map((etapa, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
                          >
                            {index + 1}
                          </Badge>
                          <span className="text-sm">{etapa}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="documentos" className="mt-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-3">Documentos necessários</h3>
                    <ul className="space-y-2">
                      {concursoDetails.documentos.map((documento, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{documento}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inscrição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Taxa de inscrição</p>
                  <p className="text-2xl font-bold">R$ {concurso.price.toFixed(2)}</p>
                  {concurso.discountPercentage > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="destructive" className="text-xs">
                        -{concurso.discountPercentage}%
                      </Badge>
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {(concurso.price / (1 - concurso.discountPercentage / 100)).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium">Salário inicial</p>
                  <p className="text-lg">{concursoDetails.salarioInicial}</p>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground mb-1">
                    Inscrições disponíveis: <span className="font-medium">{concurso.stock}</span>
                  </p>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${Math.min(100, (1 - concurso.stock / 100) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Realizar inscrição</Button>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Avaliação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(concurso.rating) ? "text-yellow-500" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium">{concurso.rating} de 5</span>
              </div>
              <p className="text-sm text-muted-foreground">Baseado em avaliações de candidatos anteriores</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

