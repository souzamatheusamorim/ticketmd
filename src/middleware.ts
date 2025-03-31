// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // 1. Obter o token JWT (contém dados básicos)


  // 2. Obter a sessão completa (com access_token e email)
  const session = await auth()

  // 3. Extrair os dados que você precisa
  const accessToken = session?.user?.access_token
  const userEmail = session?.user?.email

  console.log('Middleware - Access Token:', accessToken)
  console.log('Middleware - User Email:', userEmail)

  // 4. Verificar autenticação
  if ( !session) {
    // Para APIs
    if (request.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Para páginas
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 5. Exemplo: Adicionar headers com os dados da sessão
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-access-token', accessToken || '')
  requestHeaders.set('x-user-email', userEmail || '')

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: [
    /*'/((?!login|register|_next/static|_next/image|favicon.ico).*)'*/
    '/dashboard',
  '/profile',
  '/settings',

  ]
}