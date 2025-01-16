import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/footer";
import Provider from "./Provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UX Community Share",
  description: "Ux community share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          <main className="min-h-screen">
            {children}
            <SpeedInsights />
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}