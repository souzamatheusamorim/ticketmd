"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Calendar, Clock } from "lucide-react";
import TicketCard from "@/components/ticket-card";
import Carrinho from "@/components/carrinho";

// Dados de exemplo para os eventos organizados por dia
const eventsByDay = {
  segunda: [
    {
      id: 1,
      name: "Show de Rock",
      price: 120,
      description: "Um show incrível com as melhores bandas de rock da cidade.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 2,
      name: "Teatro Infantil",
      price: 60,
      description: "Uma peça encantadora para toda a família.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 3,
      name: "Stand Up Comedy",
      price: 80,
      description: "Uma noite de muitas risadas com os melhores comediantes.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
  terca: [
    {
      id: 4,
      name: "Festival de Jazz",
      price: 150,
      description: "Um festival com os melhores músicos de jazz.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 5,
      name: "Exposição de Arte",
      price: 40,
      description: "Uma exposição com obras de artistas renomados.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
  quarta: [
    {
      id: 6,
      name: "Concerto Sinfônico",
      price: 200,
      description: "Um concerto emocionante com a orquestra sinfônica.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 7,
      name: "Cinema ao Ar Livre",
      price: 30,
      description: "Uma sessão especial de cinema sob as estrelas.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
  quinta: [
    {
      id: 8,
      name: "Show de MPB",
      price: 70,
      description: "Uma noite especial com os melhores sucessos da MPB.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 9,
      name: "Peça Teatral",
      price: 90,
      description: "Uma peça premiada que promete emocionar o público.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
  sexta: [
    {
      id: 10,
      name: "Show de Samba",
      price: 100,
      description: "Uma noite de samba com os melhores artistas do gênero.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 11,
      name: "Festival de Música",
      price: 180,
      description: "Um festival com diversas atrações musicais.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 12,
      name: "Espetáculo de Dança",
      price: 75,
      description: "Um espetáculo de dança contemporânea.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
  sabado: [
    {
      id: 13,
      name: "Show Internacional",
      price: 250,
      description: "Um show exclusivo com uma banda internacional.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 14,
      name: "Feira Gastronômica",
      price: 45,
      description: "Uma feira com os melhores pratos da culinária local.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
  domingo: [
    {
      id: 15,
      name: "Festival Infantil",
      price: 50,
      description: "Um dia inteiro de diversão para as crianças.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
    {
      id: 16,
      name: "Orquestra na Praça",
      price: 0,
      description: "Apresentação gratuita da orquestra municipal.",
      whoCanUse: "Quem pode comprar?",
      whoCanUseDescription:
        "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS. Consulte os documentos necessários para comprovação através da central de ajuda em nosso site",
      limitDate: "12-12-2025",
      lote: "individual - 1º lote",
    },
  ],
};

// Mapeamento dos dias para exibição
const dayLabels = {
  segunda: "Segunda",
  terca: "Terça",
  quarta: "Quarta",
  quinta: "Quinta",
  sexta: "Sexta",
  sabado: "Sábado",
  domingo: "Domingo",
};

// Descrições explicativas para cada dia
const dayDescriptions = {
  segunda: {
    title: "Segunda Cultural",
    description:
      "Comece a semana com energia! Nossa segunda-feira oferece uma programação diversificada com rock, teatro e comédia para todos os gostos.",
    highlight: "Destaque: Show de Rock com bandas locais renomadas",
  },
  terca: {
    title: "Terça Artística",
    description:
      "Uma terça-feira dedicada às artes! Mergulhe no mundo do jazz e das artes visuais com nossa seleção especial de eventos culturais.",
    highlight: "Destaque: Festival de Jazz com músicos internacionais",
  },
  quarta: {
    title: "Quarta Clássica",
    description:
      "O meio da semana pede algo especial! Desfrute de música clássica e cinema em um ambiente único e acolhedor.",
    highlight: "Destaque: Concerto Sinfônico com repertório exclusivo",
  },
  quinta: {
    title: "Quinta Brasileira",
    description:
      "Celebre a cultura brasileira! Uma noite dedicada à MPB e ao teatro nacional, valorizando nossos talentos locais.",
    highlight: "Destaque: Show de MPB com grandes sucessos nacionais",
  },
  sexta: {
    title: "Sexta Animada",
    description:
      "A sexta-feira chegou com tudo! Samba, música e dança para você curtir o início do fim de semana com muita animação.",
    highlight: "Destaque: Festival de Música com múltiplas atrações",
  },
  sabado: {
    title: "Sábado Especial",
    description:
      "O sábado é para experiências únicas! Shows internacionais e gastronomia de qualidade para um fim de semana inesquecível.",
    highlight: "Destaque: Show Internacional exclusivo",
  },
  domingo: {
    title: "Domingo em Família",
    description:
      "Termine a semana em grande estilo! Programação familiar com eventos gratuitos e atividades para todas as idades.",
    highlight: "Destaque: Apresentação gratuita da Orquestra Municipal",
  },
};

// Tipo para os itens do carrinho
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  day: string;
};

export default function TicketSalesPage() {
  // Estados para os dados dos eventos
  const [eventsByDay, setEventsByDay] = useState<Record<string, any[]>>({})
  const [dayLabels, setDayLabels] = useState<Record<string, string>>({})
  const [selectedDay, setSelectedDay] = useState<string>("segunda")
  
  // Estados para controle de carregamento e erros
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estados para o carrinho de compras
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false)
  const [isCartMinimized, setIsCartMinimized] = useState<boolean>(false)

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://mundo-app-api.vercel.app/api/v1/events/festival-de-musica-2025/tickets?companyId=a0000000-0000-0000-0000-000000000001&isActive=true", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
         // 'Authorization': 'Bearer seu_token_aqui', // Se necessário
         // 'Accept': 'application/json',
          // Adicione outros headers necessários
        },
        // credentials: 'include', // Descomente se precisar enviar cookies
      });

      // Verifica se a resposta é JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        throw new Error(`Resposta inesperada: ${textResponse.substring(0, 100)}...`);
      }

      const data = await response.json();
      console.log("📦 Dados recebidos da API:", data);

      if (!Array.isArray(data)) {
        throw new Error("Formato de dados inválido: esperado array");
      }

      const grouped: Record<string, any[]> = {};
      const labels: Record<string, string> = {};

      data.forEach((ticket: any) => {
        const day = ticket.day;
        if (!grouped[day]) grouped[day] = [];
        
        grouped[day].push({
          id: ticket.id,
          name: ticket.name,
          price: Number(ticket.price),
          description: ticket.description,
          lote: `${ticket.type} - ${ticket.batch_no}º lote`,
          limitDate: ticket.sales_end_at,
          whoCanUse: "Quem pode comprar?",
          whoCanUseDescription: "Estudantes, idosos, pcd, jovens de baixa renda, professores, doadores de sangue e COSPLAYERS..."
        });
        
        labels[day] = day.charAt(0).toUpperCase() + day.slice(1);
      });

      setEventsByDay(grouped);
      setDayLabels(labels);

      if (Object.keys(grouped).length > 0) {
        setSelectedDay(Object.keys(grouped)[0]);
      }

    } catch (err) {
      console.error("❌ Erro ao buscar ingressos:", err);
      setError(err.message || "Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []);

  // Função para adicionar um item ao carrinho
  const addToCart = (
    eventId: number,
    eventName: string,
    eventPrice: number
  ) => {
    // Verifica se o item já está no carrinho
    const existingItemIndex = cart.findIndex((item) => item.id === eventId);
    if (existingItemIndex >= 0) {
      // Atualiza a quantidade se o item já estiver no carrinho
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Adiciona novo item ao carrinho
      setCart([
        ...cart,
        {
          id: eventId,
          name: eventName,
          price: eventPrice,
          quantity: 1,
          day: dayLabels[selectedDay],
        },
      ]);
    }
    // Mostra o carrinho em dispositivos móveis quando um novo item é adicionado
    setIsCartVisible(true);
    // Expande o carrinho quando um novo item é adicionado
    setIsCartMinimized(false);
  };

  // Função para remover um item do carrinho
  const removeFromCart = (eventId: number) => {
    // Encontra o item no carrinho
    const existingItemIndex = cart.findIndex((item) => item.id === eventId);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      const currentItem = updatedCart[existingItemIndex];
      if (currentItem.quantity > 1) {
        // Diminui a quantidade se houver mais de um
        currentItem.quantity -= 1;
        setCart(updatedCart);
      } else {
        // Remove o item completamente se só houver um
        setCart(cart.filter((item) => item.id !== eventId));
      }
    }
  };

  // Função para remover completamente um item do carrinho
  const removeItemCompletely = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Obtém a quantidade de um item específico no carrinho
  const getItemQuantity = (eventId: number): number => {
    const item = cart.find((item) => item.id === eventId);
    return item ? item.quantity : 0;
  };

  // Total de itens no carrinho
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      style={{ backgroundColor: "var(--color-gray-100)" }}
      className="min-h-screen pb-24 md:pb-32"
    >
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ingressos</h1>
            <Button
              variant="outline"
              size="icon"
              className="relative md:hidden"
              onClick={() => setIsCartVisible(!isCartVisible)}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 ">
        <Tabs
          defaultValue="sabado"
          className="w-full "
          onValueChange={(value) => setSelectedDay(value)}
        >
          <TabsList className="mb-6  w-full h-auto flex flex-wrap justify-start overflow-x-auto">
            {Object.entries(dayLabels).map(([day, label]) => (
              <TabsTrigger
                key={day}
                value={day}
                className="p-6 flex-shrink-0 data-[state=active]:text-red-600 data-[state=active]:font-bold"
              >
                <div className="flex-col">
                  {label}
                  <p>{label}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Seção explicativa sobre o dia selecionado */}
          <div className="mb-8 bg-white rounded-lg p-6  ">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-red-600 mt-1" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {
                    dayDescriptions[selectedDay as keyof typeof dayDescriptions]
                      ?.title
                  }
                </h2>
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {
                    dayDescriptions[selectedDay as keyof typeof dayDescriptions]
                      ?.description
                  }
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-red-600">
                    {
                      dayDescriptions[
                        selectedDay as keyof typeof dayDescriptions
                      ]?.highlight
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {Object.entries(eventsByDay).map(([day, events]) => (
            <TabsContent key={day} value={day}>
              <div className="grid grid-cols-1 gap-4">
                {events.map((event) => (
                  <TicketCard
                    key={event.id}
                    event={event}
                    quantity={getItemQuantity(event.id)}
                    onIncrement={() =>
                      addToCart(event.id, event.name, event.price)
                    }
                    onDecrement={() => removeFromCart(event.id)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Carrinho
        cart={cart}
        isVisible={isCartVisible}
        isMinimized={isCartMinimized}
        onClose={() => setIsCartVisible(false)}
        onToggleMinimize={() => setIsCartMinimized(!isCartMinimized)}
        onRemoveItem={removeItemCompletely}
      />
    </div>
  );
}
