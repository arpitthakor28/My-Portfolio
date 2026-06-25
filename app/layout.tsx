import type { Metadata } from "next";
// import { Syne, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ParticleBackground from "@/components/ParticleBackground";


// const syne = Syne({
//   variable: "--font-syne",
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800"],
//   display: "swap",
// });

// const dmMono = DM_Mono({
//   variable: "--font-dm-mono",
//   subsets: ["latin"],
//   weight: ["300", "400", "500"],
//   display: "swap",
// });

// const instrumentSerif = Instrument_Serif({
//   variable: "--font-instrument",
//   subsets: ["latin"],
//   weight: ["400"],
//   style: ["normal", "italic"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Arpitsinh Thakor | Full Stack Web & Android Developer",
  description: "Portfolio of Arpitsinh Thakor, a passionate Full Stack Web Developer and Android App Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Cursor />

        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}

