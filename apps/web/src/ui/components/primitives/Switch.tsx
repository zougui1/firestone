"use client";

import { Switch as BaseSwitch } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styleVariants = tv({
  base: `peer bg-background-light inline-flex  h-[1.15rem] w-8
    shrink-0 cursor-pointer items-center rounded-full shadow-xs transition-all
    data-disabled:pointer-events-none data-disabled:opacity-50
    focus-visible:outline-2 focus-visible:outline-offset-2
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,

  slots: {
    thumb: `bg-background data-unchecked:bg-foreground pointer-events-none block
      size-4 rounded-full ring-0 transition-transform
      data-checked:translate-x-[calc(100%-2px)]
      data-unchecked:translate-x-0`,
  },

  variants: {
    color: {
      default: {
        base: "data-checked:bg-default focus-visible:outline-default/80!",
        thumb: "data-checked:bg-default-foreground",
      },
      neutral: {
        base: "data-checked:bg-neutral-light focus-visible:outline-neutral-light/80!",
        thumb: "data-checked:bg-neutral-light-foreground",
      },
      primary: {
        base: "data-checked:bg-primary focus-visible:outline-primary/80!",
        thumb: "data-checked:bg-primary-foreground",
      },
      secondary: {
        base: "data-checked:bg-secondary focus-visible:outline-secondary/80!",
        thumb: "data-checked:bg-secondary-foreground",
      },
      success: {
        base: "data-checked:bg-success focus-visible:outline-success/80!",
        thumb: "data-checked:bg-success-foreground",
      },
      warning: {
        base: "data-checked:bg-warning focus-visible:outline-warning/80!",
        thumb: "data-checked:bg-warning-foreground",
      },
      destructive: {
        base: "data-checked:bg-destructive focus-visible:outline-destructive/80!",
        thumb: "data-checked:bg-destructive-foreground",
      },
      info: {
        base: "data-checked:bg-info focus-visible:outline-info/80!",
        thumb: "data-checked:bg-info-foreground",
      },
    },
  },
});

export interface SwitchProps
  extends
    Omit<BaseSwitch.Root.Props, "className">,
    VariantProps<typeof styleVariants> {
  className?: string;
}

export function Switch({
  className,
  color = "primary",
  ...props
}: SwitchProps) {
  const styles = styleVariants({ color, className });

  return (
    <BaseSwitch.Root data-slot="switch" className={styles.base()} {...props}>
      <BaseSwitch.Thumb data-slot="switch-thumb" className={styles.thumb()} />
    </BaseSwitch.Root>
  );
}
