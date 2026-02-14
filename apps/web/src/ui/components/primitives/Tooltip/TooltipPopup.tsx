"use client";

import { Tooltip } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface TooltipPopupProps extends Tooltip.Popup.Props {}

export const TooltipPopup = ({ className, ...props }: TooltipPopupProps) => {
  return (
    <Tooltip.Popup
      data-slot="tooltip-popup"
      className={cn(
        `bg-background-light text-tooltip-foreground z-50> relative rounded-md
        px-3 py-1.5 text-xs text-balance`,

        "origin-(--transform-origin)",
        "transition-[opacity,transform,width,height]",
        "data-instant:transition-none",
        "data-starting-style:scale-90 data-starting-style:opacity-0",
        "data-ending-style:scale-90 data-ending-style:opacity-0",

        "h-(--popup-height,auto) w-(--popup-width,auto) max-w-[500px]",
        className,
      )}
      {...props}
    />
  );
};
