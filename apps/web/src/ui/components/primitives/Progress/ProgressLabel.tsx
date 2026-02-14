"use client";

import { Progress as BaseProgress } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ProgressLabelProps extends BaseProgress.Label.Props {}

export const ProgressLabel = ({ className, ...props }: ProgressLabelProps) => {
  return (
    <BaseProgress.Label
      data-slot="progress-label"
      className={cn("text-sm", className)}
      {...props}
    />
  );
};
