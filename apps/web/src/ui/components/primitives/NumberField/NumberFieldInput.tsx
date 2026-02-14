"use client";

import { NumberField } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `rounded-md flex items-center gap-2 h-9 w-full min-w-0 px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-2
    placeholder:text-muted-foreground
    selection:bg-default selection:text-default-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-3 aria-invalid:ring-destructive/35
    relative z-1`,

  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light!`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`,
    },
  },
});

export interface NumberFieldInputProps
  extends
    Omit<NumberField.Input.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export const NumberFieldInput = ({
  className,
  color = "default",
  ...props
}: NumberFieldInputProps) => {
  return (
    <NumberField.Input
      data-slot="number-field-input"
      {...props}
      className={styles({ color, className })}
    />
  );
};
