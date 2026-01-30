// app/layout.tsx
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useTheme } from "@/styles/useTheme";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Movieland",
    template: "%s • Movieland",
  },
  description: "A production-ready TMDB-powered frontend portfolio built with Next.js.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const {theme}=useTheme();
  return (
      <html lang="en" className={inter.variable}>
        <body className="font-sans text-text-primary" style={{background:theme.colors.background}}>
          <div className="flex min-h-screen flex-col">
            {/* Client-only components */}
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
  );
}
