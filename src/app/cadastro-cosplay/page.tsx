import { CosplayRegistrationForm } from "../../components/cosplay-registration-form"

export default function CosplayCadastroPage() {
  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Cadastro para Competição de Cosplay</h1>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo para participar da competição de cosplay do Mundo Dream.
        </p>
      </div>

      <CosplayRegistrationForm />
    </div>
  )
}

