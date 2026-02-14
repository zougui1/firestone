"use client";

import { Select as BaseSelect } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface SelectSeparatorProps extends BaseSelect.Separator.Props {}

export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return (
    <BaseSelect.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}
