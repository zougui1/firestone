"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "../../../utils";

export interface TabsIndicatorProps extends Omit<
  TabsPrimitive.Indicator.Props,
  "className"
> {
  className?: string;
}

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      className={cn(
        `bg-default/20 absolute top-1/2 left-0 z-[-1]
        h-[calc(var(--active-tab-height)-0.5rem)] w-(--active-tab-width)
        rounded-sm transition-[translate,width]`,
        `data-[orientation=horizontal]:translate-x-(--active-tab-left)
        data-[orientation=horizontal]:-translate-y-1/2`,
        `data-[orientation=vertical]:-translate-x-1/2
        data-[orientation=vertical]:translate-y-(--active-tab-left)`,
        className,
      )}
      {...props}
    />
  );
}
