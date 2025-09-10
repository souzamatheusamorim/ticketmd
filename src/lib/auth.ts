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
          const res = await fetch("https://mundo-app-api.vercel.app/api/v1/sessions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) return null;
          const data = await res.json();
          console.log("Resposta da API:", data);

          if (data && data.token) {
            return {
              id: data.user?.id || data.id || "default-id",
              email: data.user?.email || credentials?.email || "",
              token: data.token, // salva o token retornado pela API
              name: data.user?.username || null,
            } as any;
          }

          return null;
        } catch (error) {
          console.error("Erro durante a autenticação:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.token = (user as any).token; // token da API
        token.name = (user as any).name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email as string,
        token: token.token as string, // disponível no cliente
        name: token.name as string,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
