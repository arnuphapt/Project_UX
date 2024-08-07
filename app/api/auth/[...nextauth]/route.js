import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const emailDomain = user.email.split('@')[1];
            const allowedDomain = 'kkumail.com'; // โดเมนที่อนุญาตให้ล็อกอิน

            if (emailDomain === allowedDomain) {
                return true;
            } else {
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
