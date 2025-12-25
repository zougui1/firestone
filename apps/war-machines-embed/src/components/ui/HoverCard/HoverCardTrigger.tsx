"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

export interface HoverCardTriggerProps extends React.ComponentProps<typeof HoverCardPrimitive.Trigger> {}

export function HoverCardTrigger({
  ...props
}: HoverCardTriggerProps) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}
