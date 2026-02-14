"use client";

import { Progress as BaseProgress } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: "col-[1/3] h-2 overflow-hidden rounded-sm bg-(--color)/20 inset-shadow-sm",
  variants: {
    color: {
      default: `[--color:var(--default)]`,
      neutral: `[--color:var(--neutral)]`,
      primary: `[--color:var(--primary)]`,
      secondary: `[--color:var(--secondary)]`,
      success: `[--color:var(--success)]`,
      warning: `[--color:var(--warning)]`,
      destructive: `[--color:var(--destructive)]`,
      info: `[--color:var(--info)]`,
    },
  },
});

export interface ProgressTrackProps
  extends
    Omit<BaseProgress.Track.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export const ProgressTrack = ({
  className,
  color = "default",
  ...props
}: ProgressTrackProps) => {
  return (
    <BaseProgress.Track
      data-slot="progress-track"
      className={styles({ color, className })}
      {...props}
    />
  );
};
