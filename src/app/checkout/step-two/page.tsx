"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Package, QrCode, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Email de teste para simular base de dados
const TEST_EMAIL = "usuario@teste.com"

const INSTALLMENT_OPTIONS = [
  { installments: 1, interestRate: 0, totalAmount: 299.9 },
  { installments: 2, interestRate: 0, totalAmount: 299.9 },
  { installments: 3, interestRate: 0, totalAmount: 299.9 },
  { installments: 4, interestRate: 2.5, totalAmount: 307.48 },
  { installments: 5, interestRate: 3.2, totalAmount: 309.49 },
  { installments: 6, interestRate: 4.1, totalAmount: 312.29 },
  { installments: 7, interestRate: 5.0, totalAmount: 314.9 },
  { installments: 8, interestRate: 5.8, totalAmount: 317.29 },
  { installments: 9, interestRate: 6.5, totalAmount: 319.39 },
  { installments: 10, interestRate: 7.2, totalAmount: 321.49 },
  { installments: 11, interestRate: 7.8, totalAmount: 323.29 },
  { installments: 12, interestRate: 8.5, totalAmount: 325.49 },
]

export default function CheckoutStepTwo() {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [isEmailInDatabase, setIsEmailInDatabase] = useState(false)
  const [showUserFields, setShowUserFields] = useState(false)
  const [selectedInstallments, setSelectedInstallments] = useState<number>(1)

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

  const handleEmailCheck = (emailValue: string) => {
    setEmail(emailValue)
  }

  const handleEmailBlur = () => {
    if (email.length > 0) {
      // Simula verificação na base de dados
      const emailExists = email === TEST_EMAIL
      setIsEmailInDatabase(emailExists)
      setShowUserFields(!emailExists)
    } else {
      setIsEmailInDatabase(false)
      setShowUserFields(false)
    }
  }

  const getInstallmentInfo = (installments: number) => {
    const option = INSTALLMENT_OPTIONS.find((opt) => opt.installments === installments)
    if (!option) return { installmentValue: 0, totalAmount: 0, interestRate: 0 }

    const installmentValue = option.totalAmount / installments
    return {
      installmentValue,
      totalAmount: option.totalAmount,
      interestRate: option.interestRate,
    }
  }

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
          {/* Payment Information */}
          {paymentMethod === "card" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Pagamento com Cartão</CardTitle>
                <CardDescription>
                  {isEmailInDatabase
                    ? "Usuário já cadastrado - dados carregados automaticamente"
                    : "Informe seus dados para pagamento"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => handleEmailCheck(e.target.value)}
                    onBlur={handleEmailBlur}
                  />
                  {email === TEST_EMAIL && isEmailInDatabase && (
                    <p className="text-sm text-green-600">✓ Email encontrado na base de dados</p>
                  )}
                </div>

                {showUserFields && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-name-full">Nome Completo</Label>
                      <Input id="card-name-full" placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-cpf">CPF</Label>
                      <Input id="card-cpf" placeholder="000.000.000-00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-whatsapp">WhatsApp</Label>
                      <Input id="card-whatsapp" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                )}

                <div className="space-y-4 border-t pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="installments">Parcelas</Label>
                    <Select
                      value={selectedInstallments.toString()}
                      onValueChange={(value) => setSelectedInstallments(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de parcelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {INSTALLMENT_OPTIONS.map((option) => {
                          const installmentValue = option.totalAmount / option.installments
                          return (
                            <SelectItem key={option.installments} value={option.installments.toString()}>
                              {option.installments}x de R$ {installmentValue.toFixed(2).replace(".", ",")}
                              {option.interestRate > 0 && (
                                <span className="text-muted-foreground ml-1">
                                  (Total: R$ {option.totalAmount.toFixed(2).replace(".", ",")})
                                </span>
                              )}
                              {option.interestRate === 0 && option.installments <= 3 && (
                                <span className="text-green-600 ml-1 font-medium">sem juros</span>
                              )}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    {selectedInstallments > 3 && (
                      <p className="text-sm text-muted-foreground">
                        Juros de{" "}
                        {INSTALLMENT_OPTIONS.find((opt) => opt.installments === selectedInstallments)?.interestRate}%
                        aplicados
                      </p>
                    )}
                  </div>
                </div>

                {/* Dados do cartão sempre visíveis */}
                <div className="space-y-4 border-t pt-4">
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
                <CardDescription>
                  {isEmailInDatabase
                    ? "Usuário já cadastrado - dados carregados automaticamente"
                    : "Informe seus dados para pagamento PIX"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Campo de email sempre visível */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => handleEmailCheck(e.target.value)}
                    onBlur={handleEmailBlur}
                  />
                  {email === TEST_EMAIL && isEmailInDatabase && (
                    <p className="text-sm text-green-600">✓ Email encontrado na base de dados</p>
                  )}
                </div>

                {/* Campos adicionais apenas se email não estiver na base */}
                {showUserFields && (
                  <div className="space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="pix-name">Nome Completo</Label>
                      <Input id="pix-name" placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                      <Input id="whatsapp" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                )}

                {/* QR Code PIX */}
                <div className="flex flex-col items-center pt-4 border-t">
                  <div className="w-36 h-36 md:w-48 md:h-48 bg-muted flex items-center justify-center border">
                    <QrCode className="w-20 h-20 md:w-24 md:h-24 text-primary" />
                  </div>
                  <div className="text-center w-full mt-4">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Código PIX</p>
                    <div className="flex flex-col sm:flex-row items-center gap-2 bg-muted p-2 rounded-md">
                      <code className="text-xs overflow-x-auto w-full whitespace-nowrap">
                        00020126580014br.gov.bcb.pix0136a629534e-7693-46c6-8143-713c8b7a7a175204000053039865802BR5925Nome
                        da Empresa Fantasia6009SAO PAULO61080540900062250521RP12345678-201980720014br.gov.bcb.pix2001
                      </code>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0 whitespace-nowrap bg-transparent">
                        Copiar
                      </Button>
                    </div>
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

              {paymentMethod === "card" && selectedInstallments > 1 && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Parcelamento</p>
                    <p className="font-medium">
                      {selectedInstallments}x de R${" "}
                      {getInstallmentInfo(selectedInstallments).installmentValue.toFixed(2).replace(".", ",")}
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
                    : paymentMethod === "card"
                      ? `R$ ${getInstallmentInfo(selectedInstallments).totalAmount.toFixed(2).replace(".", ",")}`
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
              <Button variant="outline" onClick={handleBack} className="w-full bg-transparent">
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
