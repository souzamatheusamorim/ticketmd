"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Crown, Star, Sparkles, Gift } from "lucide-react"
import Confetti from "react-confetti"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CheckoutStepThree() {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })
  const [showUpgradeOffer, setShowUpgradeOffer] = useState(true)

  useEffect(() => {
    // Get selections from localStorage
    const storedDeliveryMethod = localStorage.getItem("deliveryMethod")
    const storedPaymentMethod = localStorage.getItem("paymentMethod")

    if (!storedDeliveryMethod || !storedPaymentMethod) {
      // If no selections found, redirect back to step one
      router.push("/checkout")
      return
    }

    setDeliveryMethod(storedDeliveryMethod)
    setPaymentMethod(storedPaymentMethod)
    setIsLoading(false)

    // Update window size for confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [router])

  const handleBack = () => {
    router.push("/checkout/step-two")
  }

  const handleUpgrade = () => {
    setShowUpgradeOffer(false)
    // Simulate processing
    setTimeout(() => {
      setShowConfetti(true)
      // Stop confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }, 500)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
          colors={["#a855f7", "#d8b4fe", "#f3e8ff", "#faf5ff", "#7e22ce"]}
        />
      )}

      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-primary">Finalizar Compra</h1>

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary/50 text-primary-foreground">
            1
          </div>
          <div className="h-1 w-12 md:w-24 bg-primary"></div>
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary/50 text-primary-foreground">
            2
          </div>
          <div className="h-1 w-12 md:w-24 bg-primary"></div>
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground">
            3
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left column - Order details */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-4 mb-6">
            <Check className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Pedido Confirmado!</h2>
          <p className="text-lg mb-6 max-w-md text-center">
            Seu pedido foi realizado com sucesso e está sendo processado.
          </p>

          <Card className="w-full mb-6">
            <CardHeader>
              <CardTitle>Detalhes do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Número do Pedido:</span>
                <span>#123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Método de Entrega:</span>
                <span>{deliveryMethod === "physical" ? "Entrega Física" : "Digital"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Forma de Pagamento:</span>
                <span>{paymentMethod === "card" ? "Cartão de Crédito" : "PIX"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold">
                  {paymentMethod === "pix"
                    ? deliveryMethod === "physical"
                      ? "R$ 292,41"
                      : "R$ 269,91"
                    : deliveryMethod === "physical"
                      ? "R$ 324,90"
                      : "R$ 299,90"}
                </span>
              </div>
            </CardContent>
          </Card>

          {deliveryMethod === "physical" ? (
            <p className="text-muted-foreground mb-6 text-center">
              Você receberá um e-mail com os detalhes do envio em breve.
            </p>
          ) : (
            <p className="text-muted-foreground mb-6 text-center">
              Você receberá um e-mail com instruções para acessar seu ingresso digital.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
            <Button className="flex-1">Acompanhar Pedido</Button>
          </div>
        </div>

        {/* Right column - VIP Upgrade Offer */}
        <div className="flex items-center justify-center">
          {showUpgradeOffer ? (
            <Card className="w-full border-2 border-primary/30 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 h-fit">
              <CardHeader className="pb-2 text-center">
                <Badge className="w-fit mx-auto mb-2 bg-primary/20 text-primary hover:bg-primary/30 dark:bg-primary/30 dark:hover:bg-primary/40">
                  Oferta Especial
                </Badge>
                <CardTitle className="text-xl md:text-2xl flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5 md:h-6 md:w-6 text-yellow-500" />
                  Upgrade para Ingresso VIP
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Aproveite esta oferta exclusiva disponível apenas agora!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="flex items-center justify-center">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <span className="line-through text-muted-foreground">R$ 199,90</span>
                      <span className="text-primary">R$ 149,90</span>
                    </div>
                    <p className="text-xs text-green-600 font-medium">Economize 25%</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 text-left">
                  <div className="flex items-start gap-2">
                    <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Acesso à área VIP com open bar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Meet & Greet com os artistas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Gift className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Kit exclusivo de brindes VIP</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">Entrada antecipada e sem filas</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  onClick={handleUpgrade}
                  className="w-full bg-gradient-to-r from-primary to-purple-700 hover:from-primary/90 hover:to-purple-800"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Fazer Upgrade para VIP
                </Button>
                <Button variant="ghost" onClick={() => setShowUpgradeOffer(false)} className="w-full text-sm">
                  Não, obrigado
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="w-full border border-green-200 bg-green-50 dark:bg-green-950/20 h-fit">
              <CardContent className="py-6 text-center">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-green-800 dark:text-green-400">
                  Upgrade para VIP adicionado com sucesso!
                </p>
                <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                  Você receberá instruções adicionais por e-mail.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

