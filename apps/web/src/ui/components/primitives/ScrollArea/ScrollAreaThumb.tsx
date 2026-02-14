"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { cn } from "~/ui/utils";

export interface ScrollAreaThumbProps extends BaseScrollArea.Thumb.Props {}

export const ScrollAreaThumb = ({
  className,
  ...props
}: ScrollAreaThumbProps) => {
  return (
    <BaseScrollArea.Thumb
      data-slot="scroll-area-thumb"
      {...props}
      className={cn("w-full rounded-[inherit] bg-gray-500", className)}
    />
  );
};
