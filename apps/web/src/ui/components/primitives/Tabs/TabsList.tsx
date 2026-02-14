"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { tv, type VariantProps } from "tailwind-variants";

export interface TabsListProps
  extends
    Omit<TabsPrimitive.List.Props, "className">,
    VariantProps<typeof tabsListVariants> {
  className?: string;
}

const tabsListVariants = tv({
  base: `inline-flex relative z-0 px-1 gap-1 inset-shadow-2xs
    rounded-md data-[variant=line]:rounded-none
    group/tabs-list
    w-fit items-center justify-center
    group-data-[orientation=vertical]/tabs:h-fit
    group-data-[orientation=vertical]/tabs:flex-col`,

  variants: {
    variant: {
      default: "bg-muted",
      line: "gap-1 bg-transparent",
    },
  },
});

export function TabsList({
  className,
  variant = "default",
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={tabsListVariants({ variant, className })}
      {...props}
    />
  );
}
