"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

interface SignOutButtonProps {}

export default function SignOutButton({}: SignOutButtonProps) {
  return <Button onClick={() => signOut()}>Sign out</Button>;
}
