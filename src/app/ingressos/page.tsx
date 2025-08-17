"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Calendar, Clock } from "lucide-react"
import TicketCard from "@/components/ticket-card"
import Carrinho from "@/components/carrinho"

// Descrições fixas dos dias
const dayDescriptions = {
  segunda: { title: "Segunda Cultural", description: "...", highlight: "Show de Rock" },
  terca: { title: "Terça Artística", description: "...", highlight: "Festival de Jazz" },
  quarta: { title: "Quarta Clássica", description: "...", highlight: "Concerto Sinfônico" },
  quinta: { title: "Quinta Brasileira", description: "...", highlight: "Show de MPB" },
  sexta: { title: "Sexta Animada", description: "...", highlight: "Festival de Música" },
  sabado: { title: "Sábado Especial", description: "...", highlight: "Show Internacional" },
  domingo: { title: "Domingo em Família", description: "...", highlight: "Orquestra Municipal" },
}

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  day: string
}

export default function TicketSalesPage() {
  const [eventsByDay, setEventsByDay] = useState<Record<string, any[]>>({})
  const [dayLabels, setDayLabels] = useState<Record<string, string>>({})
  const [selectedDay, setSelectedDay] = useState<string>("")

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [isCartMinimized, setIsCartMinimized] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(
          "https://mundo-app-api.vercel.app/api/v1/events/festival-de-musica-2025/tickets?companyId=a0000000-0000-0000-0000-000000000001&isActive=true"
        )
        const data = await res.json()
        console.log("📦 API:", data)

        if (!Array.isArray(data)) throw new Error("Formato inválido")

        // Agrupar por dia
        const grouped: Record<string, any[]> = {}
        const labels: Record<string, string> = {}

        data.forEach((ticket: any) => {
          const day = ticket.day 
          if (!grouped[day]) grouped[day] = []

          grouped[day].push({
            id: ticket.id,
            name: ticket.name,
            price: Number(ticket.price),
            description: ticket.description,
            lote: `${ticket.type} - ${ticket.batch_no}º lote`,
            limitDate: ticket.sales_end_at,
            whoCanUse: "Quem pode comprar?",
            whoCanUseDescription:
              "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS...",
          })

          labels[day] = day.charAt(0).toUpperCase() + day.slice(1)
        })

        setEventsByDay(grouped)
        setDayLabels(labels)
        setSelectedDay(Object.keys(grouped)[0] || "")
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // funções add/remove carrinho iguais às suas
  const addToCart = (id: string, name: string, price: number) => {
    const idx = cart.findIndex((i) => i.id === id)
    if (idx >= 0) {
      const c = [...cart]
      c[idx].quantity += 1
      setCart(c)
    } else {
      setCart([...cart, { id, name, price, quantity: 1, day: dayLabels[selectedDay] }])
    }
    setIsCartVisible(true)
    setIsCartMinimized(false)
  }

  const removeFromCart = (id: string) => {
    const idx = cart.findIndex((i) => i.id === id)
    if (idx >= 0) {
      const c = [...cart]
      if (c[idx].quantity > 1) c[idx].quantity -= 1
      else c.splice(idx, 1)
      setCart(c)
    }
  }

  const removeItemCompletely = (id: string) =>
    setCart(cart.filter((i) => i.id !== id))

  const getItemQuantity = (id: string) =>
    cart.find((i) => i.id === id)?.quantity || 0

  const cartItemCount = cart.reduce((t, i) => t + i.quantity, 0)

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ingressos</h1>
          <Button
            variant="outline"
            size="icon"
            className="relative md:hidden"
            onClick={() => setIsCartVisible(!isCartVisible)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {isLoading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!isLoading && !error && (
          <Tabs value={selectedDay} onValueChange={setSelectedDay}>
            <TabsList className="mb-6 flex flex-wrap">
              {Object.entries(dayLabels).map(([day, label]) => (
                <TabsTrigger key={day} value={day} className="px-4 py-2">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mb-6 bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold">
                {dayDescriptions[selectedDay as keyof typeof dayDescriptions]?.title}
              </h2>
              <p>{dayDescriptions[selectedDay as keyof typeof dayDescriptions]?.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-600">
                  {dayDescriptions[selectedDay as keyof typeof dayDescriptions]?.highlight}
                </span>
              </div>
            </div>

            {Object.entries(eventsByDay).map(([day, events]) => (
              <TabsContent key={day} value={day}>
                <div className="grid gap-4">
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
        )}
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
