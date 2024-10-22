// route.js
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

// อ่านค่า allowed emails จาก environment variable
const getAllowedEmails = () => {
  const emailsString = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS;
  if (!emailsString) {
    console.warn('ALLOWED_ADMIN_EMAILS is not configured in environment variables');
    return [];
  }
  // แยก emails ด้วย comma
  return emailsString.split(',').map(email => email.trim());
};

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
        const allowedEmails = getAllowedEmails();
        token.role = allowedEmails.includes(user.email) ? "admin" : "user";
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