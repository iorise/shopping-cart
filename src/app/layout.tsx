import "@/styles/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { CartProvider } from "@/context/cart-context";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shop cart",
  description: "Shopping cart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <html lang="en">
        <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
        <body className={poppins.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </CartProvider>
  );
}
