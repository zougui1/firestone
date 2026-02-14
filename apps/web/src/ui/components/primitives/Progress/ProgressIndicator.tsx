"use client";

import { Progress as BaseProgress } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "~/ui/utils";

const styles = tv({
  base: "block bg-gray-500 transition-[width]",
  variants: {
    color: {
      inherit: "bg-(--color)",
      default: `bg-default`,
      neutral: `bg-neutral`,
      primary: `bg-primary`,
      secondary: `bg-secondary`,
      success: `bg-success`,
      warning: `bg-warning`,
      destructive: `bg-destructive`,
      info: `bg-info`,
    },
  },
});

export interface ProgressIndicatorProps
  extends
    Omit<BaseProgress.Indicator.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export const ProgressIndicator = ({
  className,
  color = "inherit",
  ...props
}: ProgressIndicatorProps) => {
  return (
    <BaseProgress.Indicator
      data-slot="progress-indicator"
      className={styles({ color, className })}
      {...props}
    />
  );
};
