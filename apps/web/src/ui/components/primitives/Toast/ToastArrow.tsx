"use client";

import { Toast as BaseToast } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ToastArrowProps extends BaseToast.Arrow.Props {}

export function ToastArrow({ className, ...props }: ToastArrowProps) {
  return (
    <BaseToast.Arrow
      data-slot="toast-arrow"
      className={cn("", className)}
      {...props}
    />
  );
}
