import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Adiciona a propriedade accessToken ao tipo Session
  }

  interface JWT {
    accessToken?: string; // Adiciona a propriedade accessToken ao tipo JWT
  }
}