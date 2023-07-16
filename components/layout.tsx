"use client";
import { HiBars3 } from "react-icons/hi2";
import Sidebar from "./sidebar";
import { Button } from "./ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SessionProvider, useSession } from "next-auth/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { useMediaQuery } from "@mantine/hooks";

interface LayoutProps {
  children?: any;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const smallViewport = useMediaQuery("(max-width: 768px)");
  const session = useSession();
  return (
    <main className="flex h-screen bg-slate-100">
      <Sidebar
        open={sidebarOpen}
        smallViewport={smallViewport}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center px-4 w-full bg-white h-[60px]">
          <div>
            {Boolean(smallViewport) && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSidebarOpen((old) => !old)}
              >
                <HiBars3 />
              </Button>
            )}
          </div>
          <HoverCard openDelay={100}>
            <HoverCardTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={session.data?.user?.image || undefined}
                  alt={session.data?.user?.name || "Profile Picture"}
                />
                <AvatarFallback>
                  {session.data?.user?.name?.[0].toUpperCase() || ""}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent align="end">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage
                    src={session.data?.user?.image || undefined}
                    alt={session.data?.user?.name || "Profile Picture"}
                  />
                  <AvatarFallback>
                    {session.data?.user?.name?.[0].toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between">
                  <p>{session.data?.user?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.data?.user?.email}
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </main>
  );
}
