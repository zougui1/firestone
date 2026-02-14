"use client";

import { Tooltip } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface TooltipArrowProps extends Tooltip.Arrow.Props {}

export const TooltipArrow = ({ className, ...props }: TooltipArrowProps) => {
  return (
    <Tooltip.Arrow
      data-slot="tooltip-arrow"
      className={cn(
        "bg-background-light z-50 size-2.5 rounded-[2px] shadow-md",
        "data-[side=top]:-bottom-1 data-[side=top]:-rotate-45",
        "data-[side=bottom]:-top-1 data-[side=bottom]:rotate-45",
        "data-[side=left]:-right-1 data-[side=left]:rotate-45",
        "data-[side=right]:-left-1 data-[side=right]:-rotate-45",
        className,
      )}
      {...props}
    />
  );
};
