import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@/app/globals.css';


export const metadata: Metadata = {
  title: "Reunion Assessment",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
