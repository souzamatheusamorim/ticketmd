"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Info, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

// Validação de CPF
const isValidCPF = (cpf: string) => {
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(cpf.charAt(9))) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(cpf.charAt(10))) return false

  return true
}

// Esquema de validação usando Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  socialName: z.string().min(2, {
    message: "O nome social deve ter pelo menos 2 caracteres.",
  }),
  fullName: z.string().min(3, {
    message: "O nome completo deve ter pelo menos 3 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, insira um número de telefone válido.",
  }),
  cpf: z.string().refine(isValidCPF, {
    message: "CPF inválido. Por favor, verifique o número informado.",
  }),
  motivation: z.string().min(10, {
    message: "Por favor, descreva sua motivação em pelo menos 10 caracteres.",
  }),
  characterName: z.string().min(2, {
    message: "O nome do personagem deve ter pelo menos 2 caracteres.",
  }),
  mediaName: z.string().min(2, {
    message: "O nome da obra deve ter pelo menos 2 caracteres.",
  }),
  mediaType: z.string({
    required_error: "Por favor, selecione o tipo de obra.",
  }),
  observations: z.string().optional(),
  referenceImage: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "A imagem de referência é obrigatória.",
    })
    .refine((files) => files[0].size <= 50 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 50MB.",
    })
    .refine((files) => ["image/jpeg", "image/jpg", "image/png"].includes(files[0].type), {
      message: "O arquivo deve ser uma imagem JPG ou PNG.",
    }),
})

export function CosplayRegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar o formulário com react-hook-form e zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      socialName: "",
      fullName: "",
      phone: "",
      cpf: "",
      motivation: "",
      characterName: "",
      mediaName: "",
      mediaType: "",
      observations: "Sem mais observações",
    },
  })

  // Função para lidar com o envio do formulário
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Aqui você faria a chamada para sua API para enviar os dados
      // Exemplo: await fetch('/api/cosplay-registration', { method: 'POST', body: formData })

      // Simulando um atraso de rede
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast("Cadastro realizado com sucesso!", {
        description: "Sua inscrição foi recebida. Em breve você receberá um e-mail de confirmação.",
        action: {
          label: "Fechar",
          onClick: () => console.log("Notificação fechada"),
        },
        duration: 5000, // Duração em milissegundos (5 segundos)
      })

      // Redirecionar após cadastro bem-sucedido
      setTimeout(() => {
        router.push("/cadastro-cosplay/sucesso")
      }, 2000)
    } catch (error) {
        toast.error("Erro ao cadastrar", {
            description: "Ocorreu um erro ao processar sua inscrição. Por favor, tente novamente.",
            action: {
              label: "Tentar novamente",
              onClick: () => console.log("Tentando novamente..."),
            },
            duration: 7000, // Duração em milissegundos (7 segundos)
          })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Informações Pessoais</h2>
                <Separator className="mb-4" />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Informe o seu melhor e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe seu email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este e-mail será usado para confirmar a sua inscrição, e lhe dar acesso ao mundo dream, para
                      realizar check-in, acompanhar e validar as suas notas!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Informe o seu Nome Social</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe seu nome social" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esta informação será a única usada na divulgação da sua participação na competição.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Informe o seu nome, igual o do RG</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esta informação não será divulgada. Ela é usada unicamente para conferência com seu documento
                      oficial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular/Whatsapp</FormLabel>
                    <FormControl>
                      <Input placeholder="Insira o telefone" {...field} />
                    </FormControl>
                    <FormDescription>
                      É por aqui que manteremos contato referente à sua participação na competição!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o número do seu CPF" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esta informação não será divulgada. Ela é usada únicamente para sua identificação.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Informações do Cosplay</h2>
                <Separator className="mb-4" />
              </div>

              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual sua motivação?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o que te motiva a participar da competição"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>O que te motiva a participar da competição?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="characterName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do personagem</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe o nome do personagem" {...field} />
                    </FormControl>
                    <FormDescription>Exemplo: Luffy</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mediaName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da obra/mídia</FormLabel>
                    <FormControl>
                      <Input placeholder="Informe o nome da obra" {...field} />
                    </FormControl>
                    <FormDescription>Exemplo: One Piece</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mediaType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Que tipo de obra está baseando este cosplay?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="anime">Anime</SelectItem>
                        <SelectItem value="manga">Mangá</SelectItem>
                        <SelectItem value="game">Game</SelectItem>
                        <SelectItem value="movie">Filme</SelectItem>
                        <SelectItem value="series">Série</SelectItem>
                        <SelectItem value="comic">Quadrinhos</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Observações adicionais sobre sua apresentação"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Observações sobre o arquivo de Referência ou Apresentação? Ou sobre a apresentação em si? Exemplo
                      se vai precisar de ajuda para subir ao palco, segurar algo, necessidade de algo não disponível
                      como tomada ou algum outro detalhe não especificado anteriormente. Ou sobre a apresentação em si?
                      Caso não tenha informe "Sem mais observações"
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referenceImage"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Imagem de referência</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={(e) => onChange(e.target.files)}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormDescription className="flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        REFERÊNCIA VISUAL OBRIGATÓRIA, insira seu arquivo de referência (Imagem de Referência) - SOMENTE
                        1 ARQUIVO. | Somente 1 Imagem de Referência em formato JPG ou PNG. (Preferencialmente no tamanho
                        de 1200 x 675 pixels). Este arquivo é obrigatório para validar a inscrição
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Inscrição"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

