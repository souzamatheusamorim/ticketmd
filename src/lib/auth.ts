import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

interface Credentials {
    email?: string;
    password?: string;
  }

export const { auth, handlers } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                console.log(credentials?.email)
                console.log(credentials?.password)
                try {
                    const res = await fetch("https://dev.mundodream.com.br/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials?.email,
                            password: credentials?.password,
                        }),
                    });
                   
                    if (res.ok) {
                        const user = await res.json();
                        console.log(user)
                        return user; // Retorna o objeto do usuário autenticado
                    } else {
                        return null; // Retorna null se a autenticação falhar
                    }
                } catch (error) {
                    console.error("Erro durante a autenticação:", error);
                    return null; // Retorna null em caso de erro
                }
            },
            
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Inclui o token na sessão do usuário
            session.accessToken = token.accessToken;
            return session;
          },
    },
    
    secret: process.env.NEXTAUTH_SECRET
});