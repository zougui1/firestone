"use client";

import { Tooltip } from "@base-ui/react";

export interface TooltipTriggerProps extends Tooltip.Trigger.Props {}

export const TooltipTrigger = (props: TooltipTriggerProps) => {
  return <Tooltip.Trigger data-slot="tooltip-trigger" {...props} />;
};
