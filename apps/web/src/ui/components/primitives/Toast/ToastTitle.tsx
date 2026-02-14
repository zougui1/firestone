"use client";

import { Toast as BaseToast } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ToastTitleProps extends BaseToast.Title.Props {}

export function ToastTitle({ className, ...props }: ToastTitleProps) {
  return (
    <BaseToast.Title
      data-slot="toast-title"
      className={cn("m-0 text-base font-medium", className)}
      {...props}
    />
  );
}
