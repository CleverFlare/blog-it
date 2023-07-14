"use client";
import { SessionProvider } from "next-auth/react";

interface AuthSessionProviderProps {
  children: any;
}

export default function AuthSessionProvider({
  children,
}: AuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
