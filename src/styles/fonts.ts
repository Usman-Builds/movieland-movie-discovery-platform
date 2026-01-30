// src/styles/fonts.ts
import { Bebas_Neue, Inter } from "next/font/google";

// Heading font
export const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

// Body font
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
