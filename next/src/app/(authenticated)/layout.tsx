import Navbar from "@/modules/_navigation/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeUp - Autenticado ✅",
  // description: "Criado para desenvolvedores melhorarem suas habilidades!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
