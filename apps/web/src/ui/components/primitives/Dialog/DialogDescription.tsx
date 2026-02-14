"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface DialogDescriptionProps extends BaseDialog.Description.Props {}

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
