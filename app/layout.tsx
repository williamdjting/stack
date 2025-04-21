import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "/globals.css";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StackUp AI",
  description: "Job Hunting Tool supercharged by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={`${inter.className} antialiased`}>{children} <Toaster /> </body>   
    </html>
  );
}
