"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface DialogTitleProps extends BaseDialog.Title.Props {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
}
