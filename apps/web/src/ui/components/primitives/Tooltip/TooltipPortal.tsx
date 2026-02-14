"use client";

import { Tooltip } from "@base-ui/react";

export interface TooltipPortalProps extends Tooltip.Portal.Props {}

export const TooltipPortal = (props: TooltipPortalProps) => {
  return <Tooltip.Portal data-slot="tooltip-portal" {...props} />;
};
