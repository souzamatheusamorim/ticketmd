"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Package, QrCode, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function CheckoutStepTwo() {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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
  }, [router])

  const handleBack = () => {
    router.push("/checkout")
  }

  const handleContinue = () => {
    router.push("/checkout/step-three")
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
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-8 text-center text-primary">Finalizar Compra</h1>

      {/* Progress indicator */}
      <div className="flex items-center justify-center mb-6 md:mb-8">
        <div className="flex items-center">
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary/50 text-primary-foreground">
            1
          </div>
          <div className="h-1 w-12 md:w-24 bg-primary"></div>
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground">
            2
          </div>
          <div className="h-1 w-12 md:w-24 bg-muted"></div>
          <div className="rounded-full h-8 w-8 flex items-center justify-center bg-muted text-muted-foreground">3</div>
        </div>
      </div>

      <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Information */}
          {deliveryMethod === "physical" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Endereço de Entrega</CardTitle>
                <CardDescription>Informe onde deseja receber seu produto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" placeholder="00000-000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">Número</Label>
                    <Input id="number" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Rua, Avenida, etc." />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input id="complement" placeholder="Apto, Bloco, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input id="neighborhood" placeholder="Seu bairro" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade/UF</Label>
                    <Input id="city" placeholder="Cidade/UF" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Informações para Download</CardTitle>
                <CardDescription>Informe seus dados para receber o link de download</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="digital-name">Nome Completo</Label>
                    <Input id="digital-name" placeholder="Seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="digital-phone">Telefone</Label>
                    <Input id="digital-phone" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-email">Confirmar Email</Label>
                  <Input id="confirm-email" type="email" placeholder="seu@email.com" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {paymentMethod === "card" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Pagamento com Cartão</CardTitle>
                <CardDescription>Informe os dados do seu cartão</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-name">Nome no Cartão</Label>
                    <Input id="card-name" placeholder="Nome como está no cartão" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Validade</Label>
                      <Input id="expiry" placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Pagamento com PIX</CardTitle>
                <CardDescription>Escaneie o QR Code ou copie o código PIX</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col items-center">
                <div className="w-36 h-36 md:w-48 md:h-48 bg-muted flex items-center justify-center border">
                  <QrCode className="w-20 h-20 md:w-24 md:h-24 text-primary" />
                </div>
                <div className="text-center w-full">
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">Código PIX</p>
                  <div className="flex flex-col sm:flex-row items-center gap-2 bg-muted p-2 rounded-md">
                    <code className="text-xs overflow-x-auto w-full whitespace-nowrap">
                      00020126580014br.gov.bcb.pix0136a629534e-7693-46c6-8143-713c8b7a7a175204000053039865802BR5925Nome
                      da Empresa Fantasia6009SAO PAULO61080540900062250521RP12345678-201980720014br.gov.bcb.pix2001
                    </code>
                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0 whitespace-nowrap">
                      Copiar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-4 mt-6 md:mt-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-primary text-lg">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm md:text-base">Produto Premium</p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {deliveryMethod === "physical" ? "Versão Física" : "Versão Digital"}
                    </p>
                  </div>
                </div>
                <p className="font-medium text-sm md:text-base">R$ 299,90</p>
              </div>

              <Separator />

              {deliveryMethod === "physical" && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Frete</p>
                    <p className="font-medium">R$ 25,00</p>
                  </div>
                  <Separator />
                </>
              )}

              {paymentMethod === "pix" && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Desconto PIX (10%)</p>
                    <p className="font-medium text-green-600">
                      -R$ {deliveryMethod === "physical" ? "32,49" : "29,99"}
                    </p>
                  </div>
                  <Separator />
                </>
              )}

              <div className="flex items-center justify-between">
                <p className="font-medium">Total</p>
                <p className="font-bold text-lg text-primary">
                  {paymentMethod === "pix"
                    ? deliveryMethod === "physical"
                      ? "R$ 292,41"
                      : "R$ 269,91"
                    : deliveryMethod === "physical"
                      ? "R$ 324,90"
                      : "R$ 299,90"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button onClick={handleContinue} className="w-full">
                {paymentMethod === "card" ? (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Finalizar Compra
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Confirmar Pedido
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleBack} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

