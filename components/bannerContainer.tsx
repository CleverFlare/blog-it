import { ComponentProps } from "react";

interface BannerContainerProps extends ComponentProps<"div"> {}

export default function BannerContainer({ children }: BannerContainerProps) {
  return (
    <div className="lg:w-[1200px] lg:mx-auto w-full overflow-hidden">
      {children}
    </div>
  );
}
