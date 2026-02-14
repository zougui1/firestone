"use client";

import { Select as BaseSelect } from "@base-ui/react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "~/ui/utils";

export interface SelectScrollDownArrowProps
  extends BaseSelect.ScrollDownArrow.Props {}

export function SelectScrollDownArrow({
  className,
  ...props
}: SelectScrollDownArrowProps) {
  return (
    <BaseSelect.ScrollDownArrow
      data-slot="select-scroll-down-arrow"
      className={cn(
        `bg-popover bottom-0 z-10 flex w-full cursor-default items-center
        justify-center py-1 [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </BaseSelect.ScrollDownArrow>
  );
}
