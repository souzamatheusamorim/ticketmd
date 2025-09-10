// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { auth } from '@/lib/auth'
import { AUTH_CONFIG, isPublicRoute } from '@/lib/auth-config'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verificar se é uma rota pública
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // 2. Obter a sessão completa (com access_token e email)
  const session = await auth()

  // 3. Extrair os dados que você precisa
  const accessToken = session?.user?.access_token
  const userEmail = session?.user?.email

  console.log('Middleware - Access Token:', accessToken)
  console.log('Middleware - User Email:', userEmail)

  // 4. Verificar autenticação - FORÇAR AUTENTICAÇÃO
  if (!session || !accessToken) {
    // Para APIs
    if (request.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    // Para páginas - SEMPRE redirecionar para login se não autenticado
    return NextResponse.redirect(new URL(AUTH_CONFIG.LOGOUT_REDIRECT_URL, request.url))
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
    // Proteger apenas rotas que precisam de autenticação
    '/dashboard/:path*',
    '/profile/:path*', 
    '/settings/:path*',
    '/concursos/:path*',
    '/users/:path*',
    '/checkout/:path*',
    '/cadastro-cosplay/:path*',
    '/api/((?!auth).*)' // Proteger APIs exceto auth
  ]
}