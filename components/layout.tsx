"use client";
import { FaBurger } from "react-icons/fa6";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { useState } from "react";

interface LayoutProps {}

export default function Layout({}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <main className="flex h-screen bg-slate-100">
      <Sidebar open={sidebarOpen} />
      <div className="flex flex-1 justify-end"></div>
    </main>
  );
}
