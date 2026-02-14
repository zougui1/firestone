"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "../../../utils";

export interface TabsRootProps extends TabsPrimitive.Root.Props {}

export function TabsRoot({
  className,
  orientation = "horizontal",
  ...props
}: TabsRootProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs-root"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className,
      )}
      {...props}
    />
  );
}
