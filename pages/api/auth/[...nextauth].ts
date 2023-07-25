import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthTheme } from "types";
import prisma from "lib/prismaclient";
const theme: { logo: string; colorScheme: NextAuthTheme } = {
  logo: "/images/logo.png",
  colorScheme: "light",
};
export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  theme: theme,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //check whitelist
      //   try {
      //     let admin = await prisma.adminWhitelist.findUnique({
      //       where: {
      //         email: user.email?.toLowerCase(),
      //       },
      //     });
      //     let allowed = await prisma.person.findFirst({
      //       where: {
      //         email: user.email?.toLowerCase(),
      //         // type: "BRAND",
      //       },
      //     });
      //     if (admin != null || allowed != null) {
      //       return true;
      //     } else return false;
      //   } catch (err) {
      //     console.log(err);
      //     return false;
      //   }

      return true;
    },
    async session({ session, token, user }) {
      //session.user.id = token.id
      //   if (session?.user?.email) {
      //     let admin = await prisma.adminWhitelist.findUnique({
      //       where: {
      //         email: session.user?.email?.toLowerCase(),
      //       },
      //     });
      //     let person = await prisma.person.findUnique({
      //       where: {
      //         email: session.user?.email?.toLowerCase(),
      //       },
      //     });
      //     session.user.personId = person?.id;
      //     session.user.role =
      //       admin != null ? "admin" : person.type?.toLowerCase();
      //     session.user.mediaId =
      //       session.user.role === "media" ? person?.personalizedLink : null;
      //   }

      return session;
    },
  },
};
export default NextAuth(authOptions);
