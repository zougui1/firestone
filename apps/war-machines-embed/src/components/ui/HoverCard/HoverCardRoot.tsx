"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

export interface HoverCardRootProps extends React.ComponentProps<typeof HoverCardPrimitive.Root> { }

export function HoverCardRoot({
  ...props
}: HoverCardRootProps) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}
