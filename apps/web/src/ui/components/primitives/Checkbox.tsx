"use client";

import { Checkbox as BaseCheckox } from "@base-ui/react";
import { CheckIcon, MinusIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `peer border-input bg-input size-5
    shrink-0 cursor-pointer rounded-sm border shadow-xs transition-shadow
    data-disabled:pointer-events-none data-disabled:opacity-50
    focus-visible:outline-2 focus-visible:outline-offset-2
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,

  variants: {
    color: {
      default: `[&[data-checked],&[data-indeterminate]]:text-default-foreground
        [&[data-checked],&[data-indeterminate]]:border-default
        [&[data-checked],&[data-indeterminate]]:bg-default
        focus-visible:outline-default/80!`,
      neutral: `[&[data-checked],&[data-indeterminate]]:text-neutral-foreground
        [&[data-checked],&[data-indeterminate]]:border-neutral
        [&[data-checked],&[data-indeterminate]]:bg-neutral
        focus-visible:outline-neutral/80!`,
      primary: `[&[data-checked],&[data-indeterminate]]:text-primary-foreground
        [&[data-checked],&[data-indeterminate]]:border-primary
        [&[data-checked],&[data-indeterminate]]:bg-primary
        focus-visible:outline-primary/80!`,
      secondary: `[&[data-checked],&[data-indeterminate]]:text-secondary-foreground
        [&[data-checked],&[data-indeterminate]]:border-secondary
        [&[data-checked],&[data-indeterminate]]:bg-secondary
        focus-visible:outline-secondary/80!`,
      success: `[&[data-checked],&[data-indeterminate]]:text-success-foreground
        [&[data-checked],&[data-indeterminate]]:border-success
        [&[data-checked],&[data-indeterminate]]:bg-success
        focus-visible:outline-success/80!`,
      warning: `[&[data-checked],&[data-indeterminate]]:text-warning-foreground
        [&[data-checked],&[data-indeterminate]]:border-warning
        [&[data-checked],&[data-indeterminate]]:bg-warning
        focus-visible:outline-warning/80!`,
      destructive: `[&[data-checked],&[data-indeterminate]]:text-destructive-foreground
        [&[data-checked],&[data-indeterminate]]:border-destructive
        [&[data-checked],&[data-indeterminate]]:bg-destructive
        focus-visible:outline-destructive/80!`,
      info: `[&[data-checked],&[data-indeterminate]]:text-info-foreground
        [&[data-checked],&[data-indeterminate]]:border-info
        [&[data-checked],&[data-indeterminate]]:bg-info
        focus-visible:outline-info/80!`,
    },
  },
});

export interface CheckboxProps
  extends
    Omit<BaseCheckox.Root.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export function Checkbox({
  className,
  color = "primary",
  ...props
}: CheckboxProps) {
  return (
    <BaseCheckox.Root
      data-slot="checkbox"
      className={styles({ color, className })}
      {...props}
    >
      <BaseCheckox.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
        render={(props, state) => {
          const Icon = state.indeterminate ? MinusIcon : CheckIcon;
          return <Icon className="size-4.5" />;
        }}
      />
    </BaseCheckox.Root>
  );
}
