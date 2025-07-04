"use client";
import React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function AuthWrapper({ children }: SessionProviderProps) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}
