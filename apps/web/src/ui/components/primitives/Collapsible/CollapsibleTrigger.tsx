"use client";

import { Collapsible as BaseCollapsible } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface CollapsibleTriggerProps
  extends BaseCollapsible.Trigger.Props {}

export function CollapsibleTrigger({
  className,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      data-slot="collapsible-trigger"
      {...props}
      className={cn(
        `focus-visible:outline-primary/80! focus-visible:outline-2
        focus-visible:outline-offset-2`,
        className,
      )}
    />
  );
}
