"use client"; // Transforma o componente em um Client Component

import { Button } from "@/components/button";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ArrowRight } from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react"; // Substitui o auth() do lado do servidor
import { useRouter } from "next/navigation"; // Substitui o redirect do lado do servidor
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession(); // Obtém a sessão do lado do cliente
  const router = useRouter();

  // Redireciona para a página de login se não houver sessão
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Faz logout sem redirecionamento automático
    router.push("/login"); // Redireciona manualmente para a página de login
  };

  // Se a sessão ainda estiver carregando, exibe uma mensagem de carregamento
  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  return (
    <>
      {session?.user?.email} {/* Exibe o email do usuário */}
      <button onClick={handleSignOut}>SAIR</button> {/* Botão de logout */}
      
    </>
  );
}