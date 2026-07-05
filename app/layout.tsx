import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { Providers } from "@/components/Providers";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CTRLDONE — Growth & Digital Partners",
  description:
    "We plan the brand, the growth channels and the market position. Otomate, our own technical studio, builds the product. Same team, no handoff gap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${fredoka.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
