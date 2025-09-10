"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

import { useSession } from "next-auth/react"
import EventTicket from "@/components/ticket"

export default function Page() {
  const { data: session, status } = useSession()
  console.log("session?.user")
  console.log(session?.user)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid gap-4 md:grid-cols-3 h-96">
            {/* Card de Entrada de Rendimentos */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Entrada de Rendimentos</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">R$ 12.450,00</div>
                <p className="text-xs text-green-600 mt-1">+20.1% em relação ao mês anterior</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Salário</span>
                    <span className="text-green-900 font-medium">R$ 8.500,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Freelances</span>
                    <span className="text-green-900 font-medium">R$ 2.450,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700">Investimentos</span>
                    <span className="text-green-900 font-medium">R$ 1.500,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card de Saída de Rendimentos */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-800">Saída de Rendimentos</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-900">R$ 8.750,00</div>
                <p className="text-xs text-red-600 mt-1">+5.2% em relação ao mês anterior</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-700">Moradia</span>
                    <span className="text-red-900 font-medium">R$ 3.200,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-700">Alimentação</span>
                    <span className="text-red-900 font-medium">R$ 1.800,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-700">Transporte</span>
                    <span className="text-red-900 font-medium">R$ 950,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-700">Outros</span>
                    <span className="text-red-900 font-medium">R$ 2.800,00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Retângulo da direita ocupando metade da altura vertical */}
        <EventTicket/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
