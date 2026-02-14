"use client";

import { Tooltip } from "@base-ui/react";

export interface TooltipProviderProps extends Tooltip.Provider.Props {}

export const TooltipProvider = (props: TooltipProviderProps) => {
  return <Tooltip.Provider delay={50} {...props} />;
};
