import './globals.css'
import type { Metadata } from "next";
import { SessionProvider } from 'next-auth/react';

import { Montserrat, Oxanium  } from 'next/font/google'

export const metadata: Metadata = {
  title: "Create Next App",
};

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
  return (
    <html lang="en" className={`${oxanium.variable} ${montserrat.variable}`}>
      <body className='bg-white antialiased'>
        <SessionProvider>
        {children}
        </SessionProvider>
        </body>
    </html>
  );
}
