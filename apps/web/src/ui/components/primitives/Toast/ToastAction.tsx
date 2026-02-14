"use client";

import { Toast as BaseToast } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ToastActionProps extends BaseToast.Action.Props {}

export function ToastAction({ className, ...props }: ToastActionProps) {
  return (
    <BaseToast.Action
      data-slot="toast-action"
      className={cn("", className)}
      {...props}
    />
  );
}
