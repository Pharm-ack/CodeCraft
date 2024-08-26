import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeCraft: Programming Tips for Efficient Development",
  description:
    "A curated collection of programming tips and best practices designed to enhance your coding skills and boost productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} custom-scrollbar flex flex-col`}>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
