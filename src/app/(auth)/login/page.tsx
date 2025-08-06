"use client"; // Transforma o componente em um Client Component

import { BgVideo } from "@/components/bgVideo";
import { Mail, Lock, ChevronRight } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();

  // Estados para armazenar os valores dos inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Login submitted", { email, password });

    // Chama a função de autenticação do NextAuth
    const result = await signIn("credentials", {
      email: email,
      password,

    });

    if (result?.error) {
      console.error("Erro durante o login:", result.error);
    } else {
      // Redireciona para a página inicial após o login bem-sucedido
      router.push("/");
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* Login Section - 30% width */}
      <div className="w-[30%] flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Bem-Vindo</h1>
            <p className="text-sm text-gray-500">Utilize seu email para acessar sua conta.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  type="email"
                  value={email} // Valor controlado pelo estado
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
                  Esqueceu sua senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password} // Valor controlado pelo estado
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pl-9 text-sm placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                style={{ backgroundColor: '#9333ea' }}
                className="w-[100px] h-[100px] rounded-lg px-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                <div className="flex">
                  
                <div style={{ color: 'white' }} className="text-white">Entrar</div>
                <ChevronRight style={{ color: 'white' }} size={24} className="text-blue-500" />
                </div>
              </button>
             
            </div>

          </form>
          <div className="text-center text-sm text-gray-500">
           Ainda não tem uma conta?{" "}
            <Link href="/register" className="font-semibold text-black hover:underline">
              Crie uma agora mesmo
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section - 70% width */}
      <div className="hidden w-[70%] bg-gray-50 lg:block">
        <div className="flex h-full items-center justify-center p-8">
          <BgVideo />
          <div className="max-w-2xl text-center">

            <h2 className="text-3xl font-bold text-gray-900">Discover more with our platform</h2>
            <p className="mt-4 text-gray-500">Join thousands of users who trust our platform for their daily needs.</p>
          </div>
        </div>
      </div>
    </main>
  );
}