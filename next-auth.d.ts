import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Adiciona a propriedade id ao tipo User
    email?: string; // Adiciona a propriedade email ao tipo User
    access_token?: string; // Adiciona a propriedade access_token ao tipo User
  }

  interface Session {
    user: {
      id: string; // Adiciona a propriedade id ao tipo Session.user
      email?: string; // Adiciona a propriedade email ao tipo Session.user
      access_token?: string; // Adiciona a propriedade access_token ao tipo Session.user
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Adiciona a propriedade id ao tipo JWT
    email?: string; // Adiciona a propriedade email ao tipo JWT
    access_token?: string; // Adiciona a propriedade access_token ao tipo JWT
  }
}