import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieQuest",
  description: "Emphasizes the journey to find movies.",
};

export default function RootLayout({
  children,   
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
