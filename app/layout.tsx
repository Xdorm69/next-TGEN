import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/Wrappers/SessionWrapper";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TGEN",
  description: "Your personal test generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased dark`}
      >
        <SessionWrapper>
          <Navbar />
          {/* FIXING SPACING CAUSED BY FIXED NAVBAR  */}
          <div className="mt-16" />
          {children}
          
          <Toaster />
        </SessionWrapper>
      </body>
    </html>
  );
}
