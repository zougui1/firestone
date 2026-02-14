"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface DialogViewportProps extends BaseDialog.Viewport.Props {}

export function DialogViewport({ className, ...props }: DialogViewportProps) {
  return (
    <BaseDialog.Viewport
      data-slot="dialog-viewport"
      {...props}
      className={cn(
        "fixed inset-0 flex items-center justify-center overflow-hidden py-6",
        className,
      )}
    />
  );
}
