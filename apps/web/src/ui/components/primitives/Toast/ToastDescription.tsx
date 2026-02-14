"use client";

import { Toast as BaseToast } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ToastDescriptionProps extends BaseToast.Description.Props {}

export function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return (
    <BaseToast.Description
      data-slot="toast-description"
      className={cn("m-0 text-base", className)}
      {...props}
    />
  );
}
