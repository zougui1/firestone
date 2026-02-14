"use client";

import { Dialog } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface SheetBackdropProps extends Dialog.Backdrop.Props {}

export function SheetBackdrop({ className, ...props }: SheetBackdropProps) {
  return (
    <Dialog.Backdrop
      data-slot="sheet-backdrop"
      className={cn(
        "fixed inset-0 isolate bg-black/50 opacity-100 duration-100",
        "data-starting-style:opacity-0",
        "data-ending-style:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
