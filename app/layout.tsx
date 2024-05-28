import { Toaster } from "sonner";
import type { Metadata } from "next";

import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financify",
  description:
    "A melhor forma de gerir suas finanças, de forma simples e fácil!",
  applicationName: "Financify",
  creator: "Davi Mateus",
  keywords: [
    "finanças",
    "gerenciamento",
    "controle",
    "financeiro",
    "financify",
    "finanças pessoais",
    "finanças empresariais",
    "finanças familiares",
    "finanças de negócios",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={inter.className}>
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
