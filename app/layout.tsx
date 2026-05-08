import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "https://luxurydealer.ro"
  ),
  title: {
    default: "LuxuryDealer | Dealer Auto Premium",
    template: "%s | LuxuryDealer",
  },
  icons: {
    icon: "/logo luxury.png",
    shortcut: "/logo luxury.png",
    apple: "/logo luxury.png",
  },
  description:
    "Descoperă cele mai exclusiviste automobile la LuxuryDealer. Mașini premium, servicii de top și experiență de lux.",
  keywords: [
    "dealer auto",
    "mașini premium",
    "auto second hand",
    "BMW",
    "Mercedes",
    "Audi",
    "Porsche",
    "dealer București",
  ],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://luxurydealer.ro",
    siteName: "LuxuryDealer",
    title: "LuxuryDealer | Dealer Auto Premium",
    description:
      "Descoperă cele mai exclusiviste automobile la LuxuryDealer.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxuryDealer | Dealer Auto Premium",
    description:
      "Descoperă cele mai exclusiviste automobile la LuxuryDealer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
