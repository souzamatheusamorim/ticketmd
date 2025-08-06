"use client"; // Mark this as a Client Component

import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import './globals.css'
import { SessionProvider, useSession } from 'next-auth/react';
import { Montserrat, Oxanium } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { useEffect } from 'react';
import { isPublicRoute } from '@/lib/auth-config';

//export const metadata: Metadata = {
//title: "Create Next App",
//};

const oxanium = Oxanium({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-oxanium',
})

const montserrat = Montserrat({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})

// Componente para verificar autenticação
function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Se não estiver carregando e não há sessão, redirecionar para login
    // APENAS se não for uma rota pública
    if (status === 'unauthenticated' && !isPublicRoute(pathname) && pathname !== '/login') {
      router.push('/login');
    }
  }, [session, status, router, pathname]);

  // Mostrar loading enquanto verifica autenticação
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  // Se não autenticado e não estiver em uma rota pública, não renderizar nada
  if (status === 'unauthenticated' && !isPublicRoute(pathname) && pathname !== '/login') {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" className={`${oxanium.variable} ${montserrat.variable}`}>
      <body className='bg-white antialiased'>
        <SessionProvider>
          <AuthCheck>
            {isPublicRoute(pathname) || pathname === '/login'
              ?
              children
              :
              <SidebarProvider>
                <AppSidebar />
                <main>
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            }
          </AuthCheck>
        </SessionProvider>
      </body>
    </html>
  );
}