"use client"

import { Calendar, User, MapPin, Music, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface TicketData {
  attendeeName?: string
  eventName?: string
  eventType?: string
  venue?: string
  address?: string
  eventDate?: string
  eventTime?: string
  doorsOpen?: string
  section?: string
  seat?: string
  ticketNumber?: string
  price?: string
}

interface EventTicketProps {
  tickets?: TicketData[]
  className?: string
}

export default function EventTicket({
  tickets = [
    {
      attendeeName: "JOÃO SILVA",
      eventName: "ROCK IN RIO 2024",
      eventType: "FESTIVAL DE MÚSICA",
      venue: "CIDADE DO ROCK",
      address: "RIO DE JANEIRO - RJ",
      eventDate: "15 SET 2024",
      eventTime: "18:00",
      doorsOpen: "16:00",
      section: "PISTA",
      seat: "GERAL",
      ticketNumber: "EVT123456789",
      price: "R$ 350,00",
    },
    {
      attendeeName: "JOÃO SILVA",
      eventName: "LOLLAPALOOZA 2024",
      eventType: "FESTIVAL DE MÚSICA",
      venue: "AUTÓDROMO DE INTERLAGOS",
      address: "SÃO PAULO - SP",
      eventDate: "22 SET 2024",
      eventTime: "14:00",
      doorsOpen: "12:00",
      section: "VIP",
      seat: "A15",
      ticketNumber: "EVT987654321",
      price: "R$ 450,00",
    },
    {
      attendeeName: "JOÃO SILVA",
      eventName: "FESTIVAL DE INVERNO",
      eventType: "FESTIVAL DE MÚSICA",
      venue: "PARQUE IBIRAPUERA",
      address: "SÃO PAULO - SP",
      eventDate: "30 JUL 2024",
      eventTime: "16:00",
      doorsOpen: "14:00",
      section: "CAMAROTE",
      seat: "B08",
      ticketNumber: "EVT456789123",
      price: "R$ 280,00",
    },
  ],
  className = "",
}: EventTicketProps) {
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0)
  const currentTicket = tickets[currentTicketIndex]

  const nextTicket = () => {
    setCurrentTicketIndex((prev) => (prev + 1) % tickets.length)
  }

  const prevTicket = () => {
    setCurrentTicketIndex((prev) => (prev - 1 + tickets.length) % tickets.length)
  }

  const qrData = JSON.stringify({
    attendee: currentTicket.attendeeName,
    event: currentTicket.eventName,
    venue: currentTicket.venue,
    date: currentTicket.eventDate,
    time: currentTicket.eventTime,
    section: currentTicket.section,
    seat: currentTicket.seat,
    ticket: currentTicket.ticketNumber,
  })

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      {/* Navigation Header - only show if multiple tickets */}
      {tickets.length > 1 && (
        <div className="flex items-center justify-between mb-4 px-2">
          <Button variant="outline" size="sm" onClick={prevTicket} className="h-8 w-8 p-0 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {currentTicketIndex + 1} de {tickets.length}
            </span>
            {/* Ticket indicators */}
            <div className="flex gap-1">
              {tickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTicketIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTicketIndex ? "bg-purple-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={nextTicket} className="h-8 w-8 p-0 bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Ticket Container */}
      <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Main Ticket Body */}
        <div className="bg-[var(--color-purple-999)] p-6 text-[#ffff]">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6" />
              <span className="font-bold text-lg">TICKET</span>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-80">INGRESSO</div>
              <div className="font-mono text-sm">{currentTicket.ticketNumber}</div>
            </div>
          </div>

          {/* Event Info */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold mb-2">{currentTicket.eventName}</div>
            <div className="text-sm opacity-90">{currentTicket.eventType}</div>
          </div>

          {/* Venue Info */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4" />
            <div className="text-center">
              <div className="font-semibold">{currentTicket.venue}</div>
              <div className="text-xs opacity-80">{currentTicket.address}</div>
            </div>
          </div>

          {/* Event Times */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <div className="text-xl font-bold">{currentTicket.doorsOpen}</div>
              <div className="text-xs opacity-80">ABERTURA</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{currentTicket.eventTime}</div>
              <div className="text-xs opacity-80">INÍCIO</div>
            </div>
          </div>
        </div>

        {/* Perforated Line */}
        <div className="relative bg-white">
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="w-full border-t-2 border-dashed border-gray-300"></div>
          </div>
          {/* Left Circle */}
          <div className="absolute -left-4 top-0 w-8 h-8 bg-gray-100 rounded-full transform -translate-y-1/2"></div>
          {/* Right Circle */}
          <div className="absolute -right-4 top-0 w-8 h-8 bg-gray-100 rounded-full transform -translate-y-1/2"></div>
        </div>

        {/* Ticket Details */}
        <div className="bg-white p-6 pt-8 text-gray-800">
          {/* Attendee Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide">Participante</span>
            </div>
            <div className="font-bold text-lg">{currentTicket.attendeeName}</div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Data</div>
              <div className="font-semibold">{currentTicket.eventDate}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Setor</div>
              <div className="font-semibold">{currentTicket.section}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Lugar</div>
              <div className="font-semibold">{currentTicket.seat}</div>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500 uppercase tracking-wide">Valor</span>
            </div>
            <div className="font-bold text-lg text-green-600">{currentTicket.price}</div>
          </div>

          {/* Barcode */}
          <div className="border-t pt-4 mb-6">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Código do Ingresso</div>
            <div className="font-mono text-sm mb-3">{currentTicket.ticketNumber}</div>

            {/* Simulated Barcode */}
            <div className="flex gap-px h-12 items-end">
              {Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 flex-1"
                  style={{
                    height: `${Math.random() * 80 + 20}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div className="border-t pt-4 flex justify-center">
            <div className="text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">QR Code</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
