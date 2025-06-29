"use client";
import React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function AuthProvider ({ children }: SessionProviderProps) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}
