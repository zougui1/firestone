"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface SheetViewportProps extends BaseDialog.Viewport.Props {}

export function SheetViewport({ className, ...props }: SheetViewportProps) {
  return (
    <BaseDialog.Viewport
      data-slot="sheet-viewport"
      {...props}
      className={cn(
        "fixed inset-0 flex items-center justify-center overflow-hidden py-6",
        className,
      )}
    />
  );
}
