"use client";

import { Select as BaseSelect } from "@base-ui/react";
import { ChevronUpIcon } from "lucide-react";

import { cn } from "~/ui/utils";

export interface SelectScrollUpArrowProps
  extends BaseSelect.ScrollUpArrow.Props {}

export function SelectScrollUpArrow({
  className,
  ...props
}: SelectScrollUpArrowProps) {
  return (
    <BaseSelect.ScrollUpArrow
      data-slot="select-scroll-up-arrow"
      className={cn(
        `bg-popover top-0 z-10 flex w-full cursor-default items-center
        justify-center py-1 [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </BaseSelect.ScrollUpArrow>
  );
}
