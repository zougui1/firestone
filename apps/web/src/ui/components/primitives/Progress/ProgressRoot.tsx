"use client";

import { Progress as BaseProgress } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface ProgressRootProps extends BaseProgress.Root.Props {}

export const ProgressRoot = ({ className, ...props }: ProgressRootProps) => {
  return (
    <BaseProgress.Root
      data-slot="progress-root"
      className={cn("grid grid-cols-[1fr_1fr] gap-1 gap-y-2", className)}
      {...props}
    />
  );
};
