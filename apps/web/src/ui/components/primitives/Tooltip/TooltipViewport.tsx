"use client";

import { Tooltip } from "@base-ui/react";
import { cn } from "~/ui/utils";

export interface TooltipViewportProps extends Tooltip.Viewport.Props {}

export const TooltipViewport = ({
  className,
  ...props
}: TooltipViewportProps) => {
  return (
    <Tooltip.Viewport
      data-slot="tooltip-viewport"
      className={cn(
        "relative size-full overflow-clip",
        "[--viewport-inline-padding:0.5rem]",
        `[&_data-previous]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
        [&_data-previous]:translate-0 [&_data-previous]:opacity-100
        [&_data-previous]:transition-[opacity,translate]`,
        `[&_data-current]:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
        [&_data-current]:translate-0 [&_data-current]:opacity-100
        [&_data-current]:transition-[opacity,translate]`,
        "[data-[activation-direction=left]_[data-current][data-starting-style]]:-translate-x-1/2",
        "[data-[activation-direction=left]_[data-current][data-ending-style]]:-translate-x-1/2",
        "[data-[activation-direction=right]_[data-current][data-starting-style]]:translate-x-1/2",
        "[data-[activation-direction=right]_[data-current][data-ending-style]]:translate-x-1/2",
        "[&_[data-current][data-starting-style]]:opacity-0",
        "[&_[data-current][data-ending-style]]:opacity-0",
        className,
      )}
      {...props}
    />
  );
};
