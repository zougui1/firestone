"use client";

import { Toast as BaseToast } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ToastPositionerProps extends BaseToast.Positioner.Props {}

export function ToastPositioner({ className, ...props }: ToastPositionerProps) {
  return (
    <BaseToast.Positioner
      data-slot="toast-positioner"
      className={cn("", className)}
      {...props}
    />
  );
}
