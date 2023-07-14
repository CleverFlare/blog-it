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

interface SidebarProps {
  open?: boolean;
}

export default function Sidebar({ open }: SidebarProps) {
  const smallViewport = useMediaQuery("(max-width: 768px)");
  if (smallViewport === undefined) return;
  return (
    <motion.div
      className={cn(
        "box-border flex flex-col gap-2 items-center p-3 h-screen bg-white before:absolute before:-left-full before:top-0 before:w-full before:h-full before:bg-white",
        smallViewport ? "fixed shadow-2xl w-[250px]" : "w-[70px]"
      )}
      animate={{
        left: smallViewport ? (open ? "-100%" : "0%") : "0%",
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
      <SidebarTab icon={<FaHeart />} collapse={smallViewport} href="/followed">
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
    </motion.div>
  );
}
