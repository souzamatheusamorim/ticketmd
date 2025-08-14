"use client";
import { Button } from "@/components/ui/button"
import { ShoppingCart, X, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation";

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  day: string
  image?: string
}

interface ShoppingCartProps {
  cart: CartItem[]
  isVisible: boolean
  isMinimized: boolean
  onClose: () => void
  onToggleMinimize: () => void
  onRemoveItem: (itemId: number) => void
}

export default function Carrinho({
  cart,
  isVisible,
  isMinimized,
  onClose,
  onToggleMinimize,
  onRemoveItem,
}: ShoppingCartProps) {
  const router = useRouter();
  // Calcula o total do carrinho
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Total de itens no carrinho
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-pink-200 shadow-lg transition-all duration-300 z-20",
        isVisible ? "translate-y-0" : "translate-y-full md:translate-y-0",
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="grid grid-cols-3 items-center mb-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-pink-600" />
            <h2 className="font-bold text-purple-800">Carrinho</h2>
            <span className="text-sm text-gray-600">
              ({cartItemCount} {cartItemCount === 1 ? "item" : "itens"})
            </span>
          </div>
          <div className="flex justify-center">
            { isMinimized ? <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-pink-600 hover:bg-pink-100"
              onClick={onToggleMinimize}
              title={isMinimized ? "Expandir carrinho" : "Minimizar carrinho"}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : ''}
            </Button> : ''}
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" className="md:hidden text-pink-600 hover:bg-pink-100" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            isMinimized ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100",
          )}
        >
          {cart.length === 0 ? (
            <p className="text-gray-600 text-sm py-2">Seu carrinho está vazio</p>
          ) : (
            <>
              <div className="max-h-40 overflow-y-auto mb-3">
                {cart.map((item) => (
                  <CartItemComponent key={item.id} item={item} onRemove={() => onRemoveItem(item.id)} />
                ))}
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-bold text-lg text-purple-800">Total</p>
                  <p className="text-gray-600 text-sm">Impostos inclusos</p>
                </div>
                <p className="font-bold text-xl text-pink-600">R$ {cartTotal.toFixed(2)}</p>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full bg-[#41056F] hover:bg-[#51067F] shadow-md transition-colors duration-200" onClick={() => router.push("/checkout")}>Finalizar Compra</Button>

                {/* Botão centralizado para minimizar o carrinho 
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex items-center gap-1 text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                    onClick={onToggleMinimize}
                  >
                    <span>Minimizar carrinho</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
*/}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Indicador flutuante para minimizar (visível apenas quando o carrinho não está minimizado) */}
      {!isMinimized && cart.length > 0 && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 hidden md:block">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full shadow-md px-3 py-1 h-8 bg-[#ffff] backdrop-blur-sm border border-pink-200 text-pink-600 hover:bg-pink-100"
            onClick={onToggleMinimize}
          >
            <ChevronDown className="h-4 w-4 mr-1" />
            <span className="text-xs">Minimizar</span>
          </Button>
        </div>
      )}
    </div>
  )
}

// Componente para cada item do carrinho
function CartItemComponent({ item, onRemove }: { item: CartItem; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-pink-100">
      <div className="flex-1">
        <p className="font-medium text-purple-800">{item.name}</p>
        <div className="flex flex-col text-sm text-gray-600">
          <span>
            {item.quantity} x R$ {item.price.toFixed(2)}
          </span>
          <span className="text-xs mt-0.5 text-pink-600">Dia: {item.day}</span>
        </div>
      </div>
      <p className="font-semibold mx-4 text-pink-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-600 hover:bg-pink-100" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

