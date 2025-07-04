import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import AuthWrapper from "@/providers/_auth";
import TanstackQueryWrapper from "@/providers/tanstack-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CodeUp",
  description: "Criado para desenvolvedores melhorarem suas habilidades!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn(poppins.className, "dark")}>
        <AuthWrapper>
          <TanstackQueryWrapper>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={2500}
              theme="colored"
            />
          </TanstackQueryWrapper>
        </AuthWrapper>
      </body>
    </html>
  );
}
