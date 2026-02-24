import type { Metadata } from "next";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ClientWrapper from "@/src/components/ClientWrapper";
import "@/app/globals.css";
import ScrollToTop from "@/src/components/ScrollToTop";

export const metadata: Metadata = {
  title: "J. Ashish Associates LLP",
  description: "Professional Law Firm Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

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