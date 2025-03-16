import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface Credentials {
  email?: string;
  password?: string;
}

export const { auth, handlers } = NextAuth({
  pages: {
    signIn: "/",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
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

          const user = await res.json();

          if (user && user.access_token) {
            // Retorna um objeto compatível com o tipo User
            return {
              id: user.id || "default-id", // Adicione um ID se necessário
              email: credentials?.email,
              access_token: user.access_token, // Inclui o access_token
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Erro durante a autenticação:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Se o usuário estiver disponível (durante o login), mescle com o token
      if (user) {
        token.id = user.id; // Adiciona o ID ao token
        token.email = user.email; // Adiciona o email ao token
        token.access_token = user.access_token; // Adiciona o access_token ao token
        console.log( token.access_token)
      }
      return token;
    },
  
    async session({ session, token }) {
      // Atribua as propriedades do token ao session.user
      session.user = {
        ...session.user,
        id: token.id as string, // Adiciona o ID ao session.user
        email: token.email as string, // Adiciona o email ao session.user
        access_token: token.access_token as string, // Adiciona o access_token ao session.user
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});