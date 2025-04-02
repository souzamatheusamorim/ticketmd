"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Package, CreditCard, QrCode, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CheckoutPage() {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("physical")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleContinue = () => {
    // Store selections in localStorage to access them in the next page
    localStorage.setItem("deliveryMethod", deliveryMethod)
    localStorage.setItem("paymentMethod", paymentMethod)
    router.push("/checkout/step-two")
  }

  return (
    <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-primary">Finalizar Compra</h1>

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground">
            1
          </div>
          <div className="h-1 w-12 md:w-24 bg-muted"></div>
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-muted text-muted-foreground">2</div>
          <div className="h-1 w-12 md:w-24 bg-muted"></div>
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-muted text-muted-foreground">3</div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Método de Entrega</CardTitle>
            <CardDescription>Escolha como deseja receber seu produto</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="physical"
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
              className="grid gap-4 grid-cols-1 md:grid-cols-2"
            >
              <div className="md:col-span-1">
                <RadioGroupItem value="physical" id="physical" className="peer sr-only" />
                <Label
                  htmlFor="physical"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 h-full"
                >
                  <div className="bg-primary/10 p-2 rounded-full mb-2 md:mb-3">
                    <Package className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <p className="font-medium text-base md:text-lg text-primary">Entrega Física</p>
                  <div className="mt-2 text-center">
                    <p className="font-semibold text-sm md:text-base">Disponível para entrega + R$ 25,00</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      Receba seu kit com ingresso, credencial + cordão colecionável, pulseiras e guia no conforto da sua
                      casa (máximo de 4 ingressos por pacote)
                    </p>
                    <span className="inline-block mt-2 md:mt-3 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      Recomendado
                    </span>
                  </div>
                </Label>
              </div>
              <div className="md:col-span-1">
                <RadioGroupItem value="digital" id="digital" className="peer sr-only" />
                <Label
                  htmlFor="digital"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
                >
                  <Smartphone className="mb-2 md:mb-3 h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <p className="font-medium text-sm md:text-base">Versão Digital</p>
                  <div className="mt-2 text-center">
                    <p className="font-semibold text-sm md:text-base">Disponível no formato digital GRÁTIS</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      Seu ingresso vai estar disponível na sua área de membros.
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Método de Pagamento</CardTitle>
            <CardDescription>Escolha como deseja pagar</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              defaultValue="card"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid gap-4 grid-cols-1 sm:grid-cols-2"
            >
              <div>
                <RadioGroupItem value="card" id="card" className="peer sr-only" />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 md:mb-3 h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <p className="font-medium text-sm md:text-base">Cartão de Crédito</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Pague em até 12x</p>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                <Label
                  htmlFor="pix"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 md:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <QrCode className="mb-2 md:mb-3 h-5 w-5 md:h-6 md:w-6 text-primary" />
                  <p className="font-medium text-sm md:text-base">PIX</p>
                  <p className="text-xs md:text-sm text-muted-foreground">10% de desconto</p>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleContinue} className="w-full">
              Continuar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

