import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SuccessPage() {
  return (
    <div className="container max-w-md mx-auto py-20 px-4">
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader className="pb-4 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Inscrição Confirmada!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Sua inscrição para a competição de cosplay foi recebida com sucesso.</p>
          <p className="text-muted-foreground">
            Enviamos um e-mail de confirmação com todas as informações. Fique atento à sua caixa de entrada e spam.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/">Voltar para a página inicial</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/cadastro-cosplay">Nova inscrição</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

