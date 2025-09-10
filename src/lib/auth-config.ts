// Configurações de autenticação
export const AUTH_CONFIG = {
  // Rotas que não precisam de autenticação
  PUBLIC_ROUTES: [
    '/',
    '/login',
    '/register',
    '/ingressos',
    '/api/auth',
    '/_next',
    '/favicon.ico'
  ],
  
  // Rotas que sempre precisam de autenticação
  PROTECTED_ROUTES: [
    '/dashboard',
    '/concursos',
    '/users',
    '/checkout',
    '/cadastro-cosplay',
    '/profile',
    '/settings'
  ],
  
  // URL de redirecionamento após login
  LOGIN_REDIRECT_URL: '/dashboard',
  
  // URL de redirecionamento após logout
  LOGOUT_REDIRECT_URL: '/login',
  
  // Tempo de expiração da sessão (em segundos)
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 dias
  
  // Configurações da API
  API_BASE_URL: 'https://dev.mundodream.com.br',
  
  // Headers padrão para requisições autenticadas
  getAuthHeaders: (accessToken: string) => ({
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  })
};

// Função para verificar se uma rota é pública
export function isPublicRoute(pathname: string): boolean {
  return AUTH_CONFIG.PUBLIC_ROUTES.some(route => 
    pathname.startsWith(route) || pathname === route
  );
}

// Função para verificar se uma rota é protegida
export function isProtectedRoute(pathname: string): boolean {
  return AUTH_CONFIG.PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route) || pathname === route
  );
} 