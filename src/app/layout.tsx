import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/Header'
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: 'scary uari',
  description: 'art by uari'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950">
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}