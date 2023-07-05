import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface ContainerProps extends ComponentProps<"div"> {}

export default function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={cn("w-[1024] mx-auto px-4", className)} {...props}></div>
  );
}
