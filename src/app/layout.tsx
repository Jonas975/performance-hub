import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/animations/PageTransition"; // WICHTIG: Der neue Wrapper
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Performance Hub | Premium Fitness Affiliate",
  description:
    "Discover the best fitness supplements, equipment, and apparel — curated for peak performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-background text-foreground`}
      >
        {/* Navbar bleibt statisch oben für ein hochwertiges App-Gefühl */}
        <Navbar />

        {/* Nur der Hauptinhalt wird beim Routen-Wechsel animiert */}
        <main>
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />
      </body>
    </html>
  );
}