"use client"; // Mark this as a Client Component

import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import './globals.css'
import { SessionProvider } from 'next-auth/react';
import { Montserrat, Oxanium } from 'next/font/google'
import { usePathname } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';

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
          {pathname === '/login'
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
        </SessionProvider>
      </body>
    </html>
  );
}