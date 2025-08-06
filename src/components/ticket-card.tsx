"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

type Event = {
  id: number
  name: string
  price: number
  description: string
}

interface EventCardProps {
  event: Event
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  onAddToCart?: () => void
}

export default function TicketCard({ event, quantity, onIncrement, onDecrement, onAddToCart }: EventCardProps) {
  return (
    <Card className="!bg-white border border-pink-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between gap-4">
          {/* Coluna esquerda - Conteúdo do evento */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 line-clamp-1 text-purple-800">{event.name}</h3>
            <p className="text-xl font-semibold mb-2 text-pink-600">
              {event.price === 0 ? "Grátis" : `R$ ${event.price.toFixed(2)}`}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
          </div>

          {/* Coluna direita - Controles */}
          <div className="flex flex-col items-end justify-center gap-2">
            <div className="flex items-center border border-pink-300 rounded-md bg-white">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none rounded-l-md text-pink-600 hover:bg-pink-100 hover:text-pink-700"
                onClick={onDecrement}
                disabled={quantity <= 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center font-medium text-purple-700 bg-pink-50">{quantity}</div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none rounded-r-md text-pink-600 hover:bg-pink-100 hover:text-pink-700" 
                onClick={onIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
