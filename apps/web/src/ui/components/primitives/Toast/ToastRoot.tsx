"use client";

import { Toast as BaseToast } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ToastRootProps extends BaseToast.Root.Props {}

export function ToastRoot({ className, style, ...props }: ToastRootProps) {
  return (
    <BaseToast.Root
      data-slot="toast-root"
      style={
        {
          "--gap": "0.75rem",
          "--peek": "0.75rem",
          "--scale": "calc(max(0, 1 - (var(--toast-index) * 0.1)))",
          "--shrink": "calc(1 - var(--scale))",
          "--height": "var(--toast-frontmost-height, var(--toast-height))",
          "--offset-y": `calc(
            var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) +
            var(--toast-swipe-movement-y)
          )`,
          ...style,
        } as unknown as React.CSSProperties
      }
      className={cn(
        "absolute right-0 m-[0_auto]",
        "box-border w-full border p-4",
        "bg-background shadow-lg",
        "rounded-md bg-clip-padding",
        "origin-[bottom_center]",
        "bottom-0 left-auto mr-0",
        "transition-all",
        "z-[calc(1000-var(--toast-index))]",
        "h-(--height)",
        "cursor-default select-none",

        "translate-x-(--toast-swipe-movement-x)",
        "translate-y-[calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height)))]",
        "not-data-expanded:scale-(--scale)",

        `data-expanded:h-(--toast-height)
        data-expanded:translate-y-(--offset-y)`,

        "data-starting-style:translate-y-[150%]",
        "data-ending-style:translate-y-[150%] data-ending-style:opacity-0",

        "data-limited:opacity-0",

        `after:absolute after:top-full after:left-0
        after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']`,
        className,
      )}
      {...props}
    />
  );
}
