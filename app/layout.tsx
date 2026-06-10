import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { BottomNav } from "@/components/nav/BottomNav";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Potenz-Profi — Mathe lernen",
  description:
    "Lern-App für Potenzfunktionen, Wurzelfunktionen und Umkehrfunktionen. Bildhaft, in kleinen Schritten erklärt.",
  manifest: undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf7f0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={nunito.variable}>
      <body className="font-sans">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
          <main className="flex-1 pb-28">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
