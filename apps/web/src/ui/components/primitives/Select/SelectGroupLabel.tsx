"use client";

import { Select as BaseSelect } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface SelectGroupLabelProps extends BaseSelect.GroupLabel.Props {}

export function SelectGroupLabel({
  className,
  ...props
}: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      data-slot="select-group-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}
