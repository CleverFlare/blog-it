import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface ContentContainerProps extends ComponentProps<"div"> {}

export default function ContentContainer({
  children,
  className,
  ...props
}: ContentContainerProps) {
  return (
    <div className={cn("mx-auto w-[1020px]", className)} {...props}>
      {children}
    </div>
  );
}
