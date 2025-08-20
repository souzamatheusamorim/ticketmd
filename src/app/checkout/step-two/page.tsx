"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const PRODUCT_PRICE = 299.9
const SHIPPING_PRICE = 25

// Parcelamentos fixos sobre o valor base (sem frete)
// O cálculo final aplica juros proporcionalmente ao total (produto + frete)
const INSTALLMENT_OPTIONS = [
  { installments: 1, interestRate: 0, totalAmount: 299.9 },
  { installments: 2, interestRate: 0, totalAmount: 299.9 },
  { installments: 3, interestRate: 0, totalAmount: 299.9 },
  { installments: 4, interestRate: 0.1, totalAmount: 329.89 },
  { installments: 5, interestRate: 0.12, totalAmount: 335.89 },
  { installments: 6, interestRate: 0.15, totalAmount: 344.89 },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [deliveryMethod, setDeliveryMethod] = useState("digital")
  const [selectedInstallments, setSelectedInstallments] = useState(1)

  const getFinalTotal = (payment: string, delivery: string, installments: number) => {
    let baseTotal = PRODUCT_PRICE

    if (delivery === "physical") {
      baseTotal += SHIPPING_PRICE
    }

    if (payment === "pix") {
      baseTotal = baseTotal * 0.9 // desconto de 10%
    }

    if (payment === "card") {
      const option = INSTALLMENT_OPTIONS.find((opt) => opt.installments === installments)
      if (option) {
        const jurosRatio = option.totalAmount / PRODUCT_PRICE
        baseTotal = baseTotal * jurosRatio
      }
    }

    return baseTotal
  }

  const getInstallmentInfo = (installments: number, delivery: string) => {
    const option = INSTALLMENT_OPTIONS.find((opt) => opt.installments === installments)
    if (!option) return { installmentValue: 0, totalAmount: 0, interestRate: 0 }

    let baseTotal = PRODUCT_PRICE
    if (delivery === "physical") {
      baseTotal += SHIPPING_PRICE
    }

    const jurosRatio = option.totalAmount / PRODUCT_PRICE
    const finalTotal = baseTotal * jurosRatio
    const installmentValue = finalTotal / installments

    return {
      installmentValue,
      totalAmount: finalTotal,
      interestRate: option.interestRate,
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>

      {/* Método de Entrega */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Método de Entrega</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="digital" id="digital" />
              <Label htmlFor="digital">Digital (entrega por e-mail)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="physical" id="physical" />
              <Label htmlFor="physical">Físico (+ R$ {SHIPPING_PRICE.toFixed(2).replace(".", ",")} frete)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Método de Pagamento */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Método de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pix" id="pix" />
              <Label htmlFor="pix">PIX (10% de desconto)</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Cartão de Crédito</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Parcelamento */}
      {paymentMethod === "card" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Parcelamento</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={String(selectedInstallments)}
              onValueChange={(val) => setSelectedInstallments(Number(val))}
            >
              {INSTALLMENT_OPTIONS.map((option) => {
                const { installmentValue } = getInstallmentInfo(option.installments, deliveryMethod)
                return (
                  <div key={option.installments} className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value={String(option.installments)} id={`installment-${option.installments}`} />
                    <Label htmlFor={`installment-${option.installments}`}>
                      {option.installments}x de R$ {installmentValue.toFixed(2).replace(".", ",")}
                      {option.interestRate > 0 && ` (${(option.interestRate * 100).toFixed(0)}% juros)`}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Resumo */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-2">
            <span>Ingresso:</span>
            <span>R$ {PRODUCT_PRICE.toFixed(2).replace(".", ",")}</span>
          </div>
          {deliveryMethod === "physical" && (
            <div className="flex justify-between mb-2">
              <span>Frete:</span>
              <span>R$ {SHIPPING_PRICE.toFixed(2).replace(".", ",")}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>
              R${" "}
              {getFinalTotal(paymentMethod, deliveryMethod, selectedInstallments)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Finalizar Compra</Button>
    </div>
  )
}
