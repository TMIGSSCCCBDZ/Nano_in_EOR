import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nano Tech",
  description: "Nano in reservoir EOR ",
  icons:{
    icon: '/logo.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <head>
    <link rel="icon" href="/logo.ico" type="image/ico" />
  </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
