// contexts/CartContext.tsx
"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  day: string
}

interface CartContextType {
  cart: CartItem[]
  cartTotal: number
  cartItemCount: number
  addToCart: (id: string, name: string, price: number, day: string) => void
  removeFromCart: (id: string) => void
  removeItemCompletely: (id: string) => void
  getItemQuantity: (id: string) => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem("shoppingCart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Erro ao carregar carrinho do localStorage:", error)
        localStorage.removeItem("shoppingCart") // Limpa dados corrompidos
      }
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart))
  }, [cart])

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (id: string, name: string, price: number, day: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevCart, { id, name, price, quantity: 1, day }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id)
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      
      return prevCart.filter(item => item.id !== id)
    })
  }

  const removeItemCompletely = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const getItemQuantity = (id: string) => {
    return cart.find(item => item.id === id)?.quantity || 0
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      cartTotal,
      cartItemCount,
      addToCart,
      removeFromCart,
      removeItemCompletely,
      getItemQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}