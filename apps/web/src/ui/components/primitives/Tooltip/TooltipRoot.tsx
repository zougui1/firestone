"use client";

import { Tooltip } from "@base-ui/react";

export interface TooltipRootProps extends Tooltip.Root.Props {}

export const TooltipRoot = (props: TooltipRootProps) => {
  return <Tooltip.Root data-slot="tooltip-root" {...props} />;
};
