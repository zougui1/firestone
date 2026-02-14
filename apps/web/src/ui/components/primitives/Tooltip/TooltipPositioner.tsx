"use client";

import { Tooltip } from "@base-ui/react";
import { cn } from "~/ui/utils";

export interface TooltipPositionerProps extends Tooltip.Positioner.Props {}

export const TooltipPositioner = ({
  className,
  ...props
}: TooltipPositionerProps) => {
  return (
    <Tooltip.Positioner
      data-slot="tooltip-positioner"
      sideOffset={10}
      className={cn(
        "h-(--positioner-height) w-(--positioner-width)",
        "max-w-(--available-width)",
        `transition-[top,left,right,bottom,transform]
        data-instant:transition-none`,
        className,
      )}
      {...props}
    />
  );
};
