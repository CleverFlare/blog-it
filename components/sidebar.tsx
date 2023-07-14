"use client";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import Logo from "./logo";
import { VariantProps, cva } from "class-variance-authority";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";
import { FaHouse, FaHeart, FaBoxArchive, FaBookmark } from "react-icons/fa6";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { GoSignOut } from "react-icons/go";
import { signOut } from "next-auth/react";

const sidebarTabVariants = cva(
  "flex relative items-center box-border p-2 h-10 rounded-md aspect-square gap-6",
  {
    variants: {
      active: {
        true: "bg-black text-white",
        false:
          "bg-transparent after:absolute after:top-0 after:left-0 after:transition-transform after:duration-100 after:scale-0 after:w-full after:h-full after:origin-center after:aspect-square after:rounded-md after:bg-black/5 hover:after:scale-100",
      },
      size: {
        consistent: "w-10 justify-center",
        fill: "w-full",
      },
    },
    defaultVariants: {
      active: false,
      size: "consistent",
    },
  }
);

interface SidebarTabProps
  extends VariantProps<typeof sidebarTabVariants>,
    ComponentProps<"button"> {
  collapse?: boolean;
  icon?: any;
  children: string;
  href: string;
}

export function SidebarTab({
  className,
  icon,
  children,
  collapse,
  href,
  ...props
}: SidebarTabProps) {
  const pathname = usePathname();
  if (collapse)
    return (
      <Link href={href} className="w-full">
        <button
          className={cn(
            sidebarTabVariants({
              className,
              active: pathname === href ? true : false,
              size: "fill",
            })
          )}
          {...props}
        >
          {icon}
          {children}
        </button>
      </Link>
    );
  else
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Link href={href}>
              <button
                className={cn(
                  sidebarTabVariants({
                    className,
                    active: pathname === href ? true : false,
                  })
                )}
                {...props}
              >
                {icon}
              </button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{children}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
}

interface SignOutButtonProps extends ComponentProps<"button"> {
  collapse?: boolean;
}

export function SignOutButton({ collapse }: SignOutButtonProps) {
  function handleSignout() {
    signOut();
  }
  if (!collapse)
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="font-bold"
              onClick={handleSignout}
            >
              <GoSignOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Sign Out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  else
    return (
      <Button
        variant="outline"
        size="default"
        className="gap-4 w-full font-bold"
        onClick={handleSignout}
      >
        <GoSignOut />
        Sign Out
      </Button>
    );
}

interface SidebarProps {
  open?: boolean;
  onClose?: () => any;
  smallViewport?: boolean;
}

export default function Sidebar({
  open,
  onClose,
  smallViewport,
}: SidebarProps) {
  if (smallViewport === undefined) return;
  return (
    <>
      <motion.div
        initial={false}
        className={cn(
          "box-border flex z-20 flex-col gap-2 items-center p-3 h-screen bg-white before:absolute before:-left-full before:top-0 before:w-full before:h-full before:bg-white",
          smallViewport ? "fixed shadow-2xl w-[250px]" : "w-[70px]"
        )}
        animate={{
          left: smallViewport ? (open ? "0%" : "-100%") : "0%",
        }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
      >
        <div className="flex justify-center items-center mb-4 aspect-square">
          <Logo />
        </div>
        <SidebarTab icon={<FaHouse />} collapse={smallViewport} href="/">
          Home
        </SidebarTab>
        <SidebarTab
          icon={<FaHeart />}
          collapse={smallViewport}
          href="/followed"
        >
          Followed
        </SidebarTab>
        <SidebarTab
          icon={<FaBoxArchive />}
          collapse={smallViewport}
          href="/my-blogs"
        >
          My Blogs
        </SidebarTab>
        <SidebarTab
          icon={<FaBookmark />}
          collapse={smallViewport}
          href="/bookmarks"
        >
          Bookmarks
        </SidebarTab>
        <div className="flex flex-1 items-end w-full">
          <SignOutButton collapse={smallViewport} />
        </div>
      </motion.div>
      {smallViewport && (
        <div
          className={cn(
            "fixed z-10 w-screen h-screen transition-all bg-black/10",
            open
              ? "pointer-events-auto opacity-1"
              : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
        />
      )}
    </>
  );
}
