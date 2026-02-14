"use client";

import { Separator as BaseSeparator } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `shrink-0 data-[orientation=horizontal]:h-px
    data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full
    data-[orientation=vertical]:w-px`,

  variants: {
    appearance: {
      solid: "bg-(--separator-color)",
      gradient:
        "[border-image:linear-gradient(to_var(--gradient-direction),transparent,var(--separator-color),transparent)_1]",
    },

    orientation: {
      horizontal: "",
      vertical: "",
    },

    color: {
      default: `[--separator-color:var(--background-light)]`,
      neutral: `[--separator-color:var(--neutral)]`,
      primary: `[--separator-color:var(--primary)]`,
      secondary: `[--separator-color:var(--secondary)]`,
      success: `[--separator-color:var(--success)]`,
      warning: `[--separator-color:var(--warning)]`,
      destructive: `[--separator-color:var(--destructive)]`,
      info: `[--separator-color:var(--info)]`,
    },
  },

  compoundVariants: [
    //#region appearance=gradient & orientation
    {
      appearance: "gradient",
      orientation: "horizontal",
      className: "border-t [--gradient-direction:right]",
    },
    {
      appearance: "gradient",
      orientation: "vertical",
      className: "border-l [--gradient-direction:bottom]",
    },
    //#endregion
  ],
});

export interface SeparatorProps
  extends Omit<BaseSeparator.Props, "className">, VariantProps<typeof styles> {
  className?: string;
}

export function Separator({
  className,
  appearance = "solid",
  orientation = "horizontal",
  color = "default",
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      data-slot="separator"
      orientation={orientation}
      className={styles({ color, appearance, orientation, className })}
      {...props}
    />
  );
}
