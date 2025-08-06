# TicketMD - Sistema de Gerenciamento de Ingressos

## Autenticação Forçada

Este projeto agora implementa **autenticação forçada** em todas as rotas protegidas. Os usuários devem fazer login para acessar qualquer funcionalidade do sistema.

### Configurações de Autenticação

- **Rotas Públicas**: `/login`, `/register`, `/ingressos`, `/api/auth`
- **Rotas Protegidas**: `/dashboard`, `/concursos`, `/users`, `/checkout`, `/cadastro-cosplay`
- **Redirecionamento após Login**: `/dashboard`
- **Redirecionamento após Logout**: `/login`

### Componentes de Autenticação

#### AuthGuard
Componente que força a autenticação em páginas específicas:

```tsx
import { AuthGuard } from "@/components/auth-guard";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Conteúdo protegido</div>
    </AuthGuard>
  );
}
```

#### LogoutButton
Componente para logout do usuário:

```tsx
import { LogoutButton } from "@/components/logout-button";

<LogoutButton variant="outline" size="sm" />
```

### Middleware de Autenticação

O middleware (`src/middleware.ts`) verifica automaticamente a autenticação em todas as rotas e redireciona usuários não autenticados para a página de login.

### Configurações Centralizadas

As configurações de autenticação estão centralizadas em `src/lib/auth-config.ts`:

```typescript
export const AUTH_CONFIG = {
  PUBLIC_ROUTES: ['/login', '/register', '/ingressos'],
  PROTECTED_ROUTES: ['/dashboard', '/concursos', '/users'],
  LOGIN_REDIRECT_URL: '/dashboard',
  LOGOUT_REDIRECT_URL: '/login',
  // ...
};
```

### Como Usar

1. **Login**: Acesse `/login` e insira suas credenciais
2. **Navegação**: Após o login, você será redirecionado para `/dashboard`
3. **Logout**: Use o botão "Sair" no sidebar para fazer logout
4. **Proteção**: Todas as rotas protegidas verificam automaticamente a autenticação

### Estrutura de Arquivos

```
src/
├── components/
│   ├── auth-guard.tsx          # Componente de proteção de rota
│   ├── logout-button.tsx       # Botão de logout
│   └── app-sidebar.tsx         # Sidebar com informações do usuário
├── lib/
│   ├── auth.ts                 # Configuração do NextAuth
│   └── auth-config.ts          # Configurações centralizadas
├── hooks/
│   └── use-auth.ts             # Hook personalizado para autenticação
└── middleware.ts               # Middleware de proteção de rotas
```

### Tecnologias Utilizadas

- **NextAuth.js**: Autenticação e gerenciamento de sessão
- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```
