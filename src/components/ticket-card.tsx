"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Info } from "lucide-react"

type Event = {
  id: number
  name: string
  price: number
  description: string
  whoCanUse: string
  whoCanUseDescription: string
  limitDate: string
  lote: string
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
            <span className="text-xs text-[#41056F] ">Data limite: {event.limitDate}</span>
           <h3 className="font-bold text-2xl mb-1 line-clamp-1 text-[#41056F]">
            {event.name}
            </h3>
            
            {/* Nova linha com data e lote */}
            <div className="flex gap-2 text-xs text-gray-500 mb-2">
              <span>Lote: {event.lote}</span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{event.description}</p>
            
            {/* Seção de informações - versão estática */}
            <div className="flex items-start gap-1 mt-10">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-pink-600" />
              <div className="text-sm text-gray-700">
                <p className="font-bold text-pink-600">{event.whoCanUse}</p>
                <p>{event.whoCanUseDescription}</p>
              </div>
            </div>
          </div>

          {/* Coluna direita - Controles */}
          <div className="flex flex-col items-center justify-center gap-1">
           <p className="text-2xl font-semibold text-pink-600 leading-tight">
           {event.price === 0 ? "Grátis" : (
           <>
          <span className="text-sm align-bottom mr-2">R$</span>
          <span>{event.price.toFixed(2)}</span>
    </>
  )}
</p>
            <p className="text-xs text-pink-600 -mt-1 mb-1">
              + taxa de serviço
            </p>
            <div className="flex items-center border border-pink-300 rounded-md bg-white">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md text-pink-600 hover:bg-pink-100 hover:text-pink-700"
                onClick={onDecrement}
                disabled={quantity <= 0}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="w-10 text-center font-medium text-purple-700 bg-pink-50 text-sm">
                {quantity}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-none rounded-r-md text-pink-600 hover:bg-pink-100 hover:text-pink-700" 
                onClick={onIncrement}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}