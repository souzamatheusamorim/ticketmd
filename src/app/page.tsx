"use client"; 

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; // Substitui o auth() do lado do servidor
import { useRouter } from "next/navigation"; // Substitui o redirect do lado do servidor
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession(); // Obtém a sessão do lado do cliente
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Faz logout sem redirecionamento automático
    router.push("/login"); // Redireciona manualmente para a página de login
  };

  // Se a sessão ainda estiver carregando, exibe uma mensagem de carregamento
  if (status === "loading") {
    return <p>Carregando3...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao TicketMD
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sua plataforma para compra de ingressos e eventos
          </p>
          
          <div className="space-y-4">
            {session ? (
              <div className="space-y-4">
                <p className="text-lg">
                  Olá, <span className="font-semibold">{session.user?.email}</span>!
                </p>
                <div className="space-x-4">
                  <Link 
                    href="/dashboard" 
                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Acessar Dashboard
                  </Link>
                  <Link 
                    href="/ingressos" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver Ingressos
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sair
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Faça login para acessar todas as funcionalidades
                </p>
                <div className="space-x-4">
                  <Link 
                    href="/login" 
                    className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Fazer Login
                  </Link>
                  <Link 
                    href="/ingressos" 
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver Ingressos
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}