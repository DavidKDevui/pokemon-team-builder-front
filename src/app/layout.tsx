import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PokemonProvider } from "@/context/PokedexContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import Toast from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pokemon Team Builder",
  description: "Créez et gérez votre équipe Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="fr">
      <head> 
        <link rel="icon" href="/images/home/pokeball.png" sizes="32x32" />
 
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.className} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <PokemonProvider>
              <div className="fixed inset-0 bg-gradient-to-br from-[#2c3e50] to-[#34a5f0] -z-10" />
              <main className="relative min-h-screen">
                <Navbar />
                <Toast />
                {children}
              </main>
            </PokemonProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
