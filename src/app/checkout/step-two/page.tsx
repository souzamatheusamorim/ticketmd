"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const PRODUCT_PRICE = 299.9
const SHIPPING_PRICE = 25

// opções de parcelamento (juros já calculados em cima do valor base)
const INSTALLMENT_OPTIONS = [
  { installments: 1, totalAmount: 299.9, interestRate: 0 },
  { installments: 2, totalAmount: 309.9, interestRate: 0 },
  { installments: 3, totalAmount: 319.9, interestRate: 0 },
  { installments: 4, totalAmount: 329.9, interestRate: 0 },
  { installments: 5, totalAmount: 339.9, interestRate: 0 },
  { installments: 6, totalAmount: 349.9, interestRate: 0 },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [deliveryMethod, setDeliveryMethod] = useState("digital")
  const [selectedInstallments, setSelectedInstallments] = useState(1)

  const getFinalTotal = (payment: string, delivery: string, installments: number) => {
    let baseTotal = PRODUCT_PRICE
    if (delivery === "physical") baseTotal += SHIPPING_PRICE

    if (payment === "pix") {
      baseTotal = baseTotal * 0.9 // desconto 10%
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
    if (delivery === "physical") baseTotal += SHIPPING_PRICE

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
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Formulário */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Finalizar Compra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Método de Pagamento */}
          <div>
            <Label className="text-base">Método de Pagamento</Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-2 gap-4 mt-2"
            >
              <Label
                htmlFor="pix"
                className={`p-3 border rounded-xl cursor-pointer ${
                  paymentMethod === "pix" ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
              >
                <RadioGroupItem value="pix" id="pix" className="hidden" />
                PIX (10% OFF)
              </Label>
              <Label
                htmlFor="card"
                className={`p-3 border rounded-xl cursor-pointer ${
                  paymentMethod === "card" ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
              >
                <RadioGroupItem value="card" id="card" className="hidden" />
                Cartão de Crédito
              </Label>
            </RadioGroup>
          </div>

          {/* Parcelamento */}
          {paymentMethod === "card" && (
            <div>
              <Label className="text-base">Parcelamento</Label>
              <select
                className="w-full mt-2 border rounded-lg p-2"
                value={selectedInstallments}
                onChange={(e) => setSelectedInstallments(Number(e.target.value))}
              >
                {INSTALLMENT_OPTIONS.map((opt) => (
                  <option key={opt.installments} value={opt.installments}>
                    {opt.installments}x de R${" "}
                    {getInstallmentInfo(opt.installments, deliveryMethod).installmentValue
                      .toFixed(2)
                      .replace(".", ",")}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Método de Entrega */}
          <div>
            <Label className="text-base">Método de Entrega</Label>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
              className="grid grid-cols-2 gap-4 mt-2"
            >
              <Label
                htmlFor="digital"
                className={`p-3 border rounded-xl cursor-pointer ${
                  deliveryMethod === "digital" ? "border-primary bg-primary/10" : "border-gray-300"
                }`}
              >
                <RadioGroupItem value="digital" id="digital" className="hidden" />
                Entrega Digital
              </Label>
              <Label
                htmlFor="physical"
                className={`p-3 border rounded-xl cursor-pointer ${
                  deliveryMethod === "physical"
                    ? "border-primary bg-primary/10"
                    : "border-gray-300"
                }`}
              >
                <RadioGroupItem value="physical" id="physical" className="hidden" />
                Receber em Casa (+R$ {SHIPPING_PRICE})
              </Label>
            </RadioGroup>
          </div>

          {/* Endereço */}
          {deliveryMethod === "physical" && (
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input id="address" placeholder="Rua, número, bairro" />
              <Input id="city" placeholder="Cidade" />
              <Input id="zip" placeholder="CEP" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resumo do Pedido */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Produto</span>
            <span>R$ {PRODUCT_PRICE.toFixed(2).replace(".", ",")}</span>
          </div>

          {deliveryMethod === "physical" && (
            <div className="flex justify-between">
              <span>Frete</span>
              <span>R$ {SHIPPING_PRICE.toFixed(2).replace(".", ",")}</span>
            </div>
          )}

          {paymentMethod === "pix" && (
            <div className="flex justify-between text-green-600 font-medium">
              <span>Desconto PIX</span>
              <span>-10%</span>
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="flex justify-between">
              <span>Parcelamento</span>
              <span>
                {selectedInstallments}x de R${" "}
                {getInstallmentInfo(selectedInstallments, deliveryMethod).installmentValue
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">
              R${" "}
              {getFinalTotal(paymentMethod, deliveryMethod, selectedInstallments)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>

          <Button className="w-full mt-4">Finalizar Compra</Button>
        </CardContent>
      </Card>
    </div>
  )
}
