"use client";

import { Progress as BaseProgress } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ProgressValueProps extends BaseProgress.Value.Props {}

export const ProgressValue = ({ className, ...props }: ProgressValueProps) => {
  return (
    <BaseProgress.Value
      data-slot="progress-value"
      className={cn("col-start-2 m-0 text-right text-sm", className)}
      {...props}
    />
  );
};
