"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { cn } from "~/ui/utils";

export interface ScrollAreaRootProps extends BaseScrollArea.Root.Props {}

export const ScrollAreaRoot = ({
  className,
  ...props
}: ScrollAreaRootProps) => {
  return (
    <BaseScrollArea.Root
      data-slot="scroll-area-root"
      {...props}
      className={cn(
        `has-focus-visible:outline-primary relative flex min-h-0 flex-1
        overflow-hidden rounded-md has-focus-visible:outline-[3px]
        has-focus-visible:outline-offset-2`,
        className,
      )}
    />
  );
};
