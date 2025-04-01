"use client"

import { useState } from "react"
import { ArrowRight, Check, CreditCard, Package, QrCode, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState("physical")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [currentStep, setCurrentStep] = useState(1)

  const handleContinue = () => {
    setCurrentStep(2)
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Finalizar Compra</h1>

      {currentStep === 1 ? (
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
                className="grid gap-4 md:grid-cols-2"
              >
                <div className="md:col-span-1">
                  <RadioGroupItem value="physical" id="physical" className="peer sr-only" />
                  <Label
                    htmlFor="physical"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 h-full"
                  >
                    <div className="bg-primary/10 p-2 rounded-full mb-3">
                      <Package className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium text-lg text-primary">Entrega Física</p>
                    <div className="mt-2 text-center">
                      <p className="font-semibold">Disponível para entrega + R$ 25,00</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Receba seu kit com ingresso, credencial + cordão colecionável, pulseiras e guia no conforto da
                        sua casa (máximo de 4 ingressos por pacote)
                      </p>
                      <span className="inline-block mt-3 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Recomendado
                      </span>
                    </div>
                  </Label>
                </div>
                <div className="md:col-span-1">
                  <RadioGroupItem value="digital" id="digital" className="peer sr-only" />
                  <Label
                    htmlFor="digital"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-full"
                  >
                    <Smartphone className="mb-3 h-6 w-6 text-primary" />
                    <p className="font-medium">Versão Digital</p>
                    <div className="mt-2 text-center">
                      <p className="font-semibold">Disponível no formato digital GRÁTIS</p>
                      <p className="text-sm text-muted-foreground mt-2">
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
                className="grid gap-4 md:grid-cols-2"
              >
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard className="mb-3 h-6 w-6 text-primary" />
                    <p className="font-medium">Cartão de Crédito</p>
                    <p className="text-sm text-muted-foreground">Pague em até 12x</p>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                  <Label
                    htmlFor="pix"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <QrCode className="mb-3 h-6 w-6 text-primary" />
                    <p className="font-medium">PIX</p>
                    <p className="text-sm text-muted-foreground">10% de desconto</p>
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
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Information */}
            {deliveryMethod === "physical" ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">Endereço de Entrega</CardTitle>
                  <CardDescription>Informe onde deseja receber seu produto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Número do Cartão</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="w-48 h-48 bg-muted flex items-center justify-center border">
                    <QrCode className="w-24 h-24 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Código PIX</p>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <code className="text-xs">
                        00020126580014br.gov.bcb.pix0136a629534e-7693-46c6-8143-713c8b7a7a175204000053039865802BR5925Nome
                        da Empresa Fantasia6009SAO PAULO61080540900062250521RP12345678-201980720014br.gov.bcb.pix2001
                      </code>
                      <Button variant="outline" size="sm">
                        Copiar
                      </Button>
                    </div>
                    <p className="text-sm mt-4">
                      <span className="font-medium">Importante:</span> O pagamento será confirmado em até 30 minutos.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-primary">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Produto Premium</p>
                      <p className="text-sm text-muted-foreground">
                        {deliveryMethod === "physical" ? "Versão Física" : "Versão Digital"}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">R$ 299,90</p>
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
                        -R$ {deliveryMethod === "physical" ? "31,98" : "29,99"}
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
                <Button className="w-full">
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
                  Voltar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

