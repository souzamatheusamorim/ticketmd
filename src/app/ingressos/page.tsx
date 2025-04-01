"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import TicketCard from "@/components/ticket-card"
import Carrinho from "@/components/carrinho"
import { cn } from "@/lib/utils"
// Dados de exemplo para os eventos organizados por dia
const eventsByDay = {
  segunda: [
    {
      id: 1,
      name: "Show de Rock",
      price: 120,
      description: "Um show incrível com as melhores bandas de rock da cidade.",
    },
    { id: 2, name: "Teatro Infantil", price: 60, description: "Uma peça encantadora para toda a família." },
    {
      id: 3,
      name: "Stand Up Comedy",
      price: 80,
      description: "Uma noite de muitas risadas com os melhores comediantes.",
    },
  ],
  terca: [
    { id: 4, name: "Festival de Jazz", price: 150, description: "Um festival com os melhores músicos de jazz." },
    { id: 5, name: "Exposição de Arte", price: 40, description: "Uma exposição com obras de artistas renomados." },
  ],
  quarta: [
    {
      id: 6,
      name: "Concerto Sinfônico",
      price: 200,
      description: "Um concerto emocionante com a orquestra sinfônica.",
    },
    { id: 7, name: "Cinema ao Ar Livre", price: 30, description: "Uma sessão especial de cinema sob as estrelas." },
  ],
  quinta: [
    { id: 8, name: "Show de MPB", price: 70, description: "Uma noite especial com os melhores sucessos da MPB." },
    { id: 9, name: "Peça Teatral", price: 90, description: "Uma peça premiada que promete emocionar o público." },
  ],
  sexta: [
    {
      id: 10,
      name: "Show de Samba",
      price: 100,
      description: "Uma noite de samba com os melhores artistas do gênero.",
    },
    { id: 11, name: "Festival de Música", price: 180, description: "Um festival com diversas atrações musicais." },
    { id: 12, name: "Espetáculo de Dança", price: 75, description: "Um espetáculo de dança contemporânea." },
  ],
  sabado: [
    { id: 13, name: "Show Internacional", price: 250, description: "Um show exclusivo com uma banda internacional." },
    {
      id: 14,
      name: "Feira Gastronômica",
      price: 45,
      description: "Uma feira com os melhores pratos da culinária local.",
    },
  ],
  domingo: [
    { id: 15, name: "Festival Infantil", price: 50, description: "Um dia inteiro de diversão para as crianças." },
    { id: 16, name: "Orquestra na Praça", price: 0, description: "Apresentação gratuita da orquestra municipal." },
  ],
}

// Mapeamento dos dias para exibição
const dayLabels = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
}

// Tipo para os itens do carrinho
export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  day: string
}

export default function TicketSalesPage() {
  // Estado para o carrinho de compras
  const [cart, setCart] = useState<CartItem[]>([])

  // Estado para controlar a visibilidade do carrinho em telas pequenas
  const [isCartVisible, setIsCartVisible] = useState(false)

  // Estado para controlar se o carrinho está minimizado
  const [isCartMinimized, setIsCartMinimized] = useState(false)

  // Estado para rastrear o dia selecionado
  const [selectedDay, setSelectedDay] = useState<string>("segunda")

  // Função para adicionar um item ao carrinho
  const addToCart = (eventId: number, eventName: string, eventPrice: number) => {
    // Verifica se o item já está no carrinho
    const existingItemIndex = cart.findIndex((item) => item.id === eventId)

    if (existingItemIndex >= 0) {
      // Atualiza a quantidade se o item já estiver no carrinho
      const updatedCart = [...cart]
      updatedCart[existingItemIndex].quantity += 1
      setCart(updatedCart)
    } else {
      // Adiciona novo item ao carrinho
      setCart([
        ...cart,
        {
          id: eventId,
          name: eventName,
          price: eventPrice,
          quantity: 1,
          day: dayLabels[selectedDay],
        },
      ])
    }

    // Mostra o carrinho em dispositivos móveis quando um novo item é adicionado
    setIsCartVisible(true)

    // Expande o carrinho quando um novo item é adicionado
    setIsCartMinimized(false)
  }

  // Função para remover um item do carrinho
  const removeFromCart = (eventId: number) => {
    // Encontra o item no carrinho
    const existingItemIndex = cart.findIndex((item) => item.id === eventId)

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart]
      const currentItem = updatedCart[existingItemIndex]

      if (currentItem.quantity > 1) {
        // Diminui a quantidade se houver mais de um
        currentItem.quantity -= 1
        setCart(updatedCart)
      } else {
        // Remove o item completamente se só houver um
        setCart(cart.filter((item) => item.id !== eventId))
      }
    }
  }

  // Função para remover completamente um item do carrinho
  const removeItemCompletely = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  // Obtém a quantidade de um item específico no carrinho
  const getItemQuantity = (eventId: number): number => {
    const item = cart.find((item) => item.id === eventId)
    return item ? item.quantity : 0
  }

  // Total de itens no carrinho
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-32">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ingressos</h1>
            <Button
              variant="outline"
              size="icon"
              className="relative md:hidden"
              onClick={() => setIsCartVisible(!isCartVisible)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="segunda" className="w-full" onValueChange={(value) => setSelectedDay(value)}>
          <TabsList className="mb-6 w-full h-auto flex flex-wrap justify-start overflow-x-auto bg-purple-999">
            {Object.entries(dayLabels).map(([day, label]) => (
              <TabsTrigger key={day} value={day}  className={("flex-shrink-0 data-[state=active]:text-red-600 data-[state=active]:font-bold")}
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(eventsByDay).map(([day, events]) => (
            <TabsContent key={day} value={day}>
              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <TicketCard
                    key={event.id}
                    event={event}
                    quantity={getItemQuantity(event.id)}
                    onIncrement={() => addToCart(event.id, event.name, event.price)}
                    onDecrement={() => removeFromCart(event.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Carrinho
        cart={cart}
        isVisible={isCartVisible}
        isMinimized={isCartMinimized}
        onClose={() => setIsCartVisible(false)}
        onToggleMinimize={() => setIsCartMinimized(!isCartMinimized)}
        onRemoveItem={removeItemCompletely}
      />
    </div>
  )
}

