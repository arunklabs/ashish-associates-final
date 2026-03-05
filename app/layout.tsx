import "@/app/globals.css";
import ClientWrapper from "@/src/components/ClientWrapper";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import ScrollToTop from "@/src/components/ScrollToTop";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "J. Ashish Associates LLP",
  description: "Professional Law Firm Website",
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>

        <ClientWrapper>
          <ScrollToTop />
          <Header />

          <main className="flex-1 pt-4">
            {children}
          </main>

          <Footer />

        </ClientWrapper>

      </body>
    </html>
  );
}