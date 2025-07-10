"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function TestCasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();

  if (session.status === "unauthenticated" || session.data?.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
