import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAdminEmails } from '../../../utils/adminEmail';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const adminEmails = await getAdminEmails();
        token.role = adminEmails.includes(user.email) ? "admin" : "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };