"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "~/ui/utils";

export interface TabsTriggerProps extends Omit<
  TabsPrimitive.Tab.Props,
  "className"
> {
  className?: string;
}

export function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        `hover:text-foreground data-active:text-foreground m-0 inline-flex h-8
        appearance-none items-center justify-center border-0 px-2 text-sm
        font-medium break-keep whitespace-nowrap text-gray-400 outline-0
        transition-colors select-none`,
        `focus-visible:before:outline-default/80! focus-visible:relative
        focus-visible:before:absolute focus-visible:before:inset-[0.25rem_0]
        focus-visible:before:rounded-sm focus-visible:before:outline-2
        focus-visible:before:outline-offset-2 focus-visible:before:content-['']`,
        className,
      )}
      {...props}
    />
  );
}
