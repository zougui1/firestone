"use client";

import { Select as BaseSelect } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";
import { ChevronDownIcon } from "lucide-react";

const styles = tv({
  base: `rounded-md flex justify-between items-center gap-2 min-w-0 min-h-9 px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-[3px]
    aria-invalid:ring-3 aria-invalid:ring-destructive/35
    placeholder:text-muted-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed
    disabled:opacity-50
    [&_svg]:pointer-events-none
    [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer`,

  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light! [&_svg:not([class*='text-'])]:text-muted-foreground`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`,
    },

    blur: {
      true: "backdrop-blur-xs",
    },
  },
});

export interface SelectTriggerProps
  extends
    Omit<BaseSelect.Trigger.Props, "className">,
    VariantProps<typeof styles> {
  size?: "sm" | "default";
  className?: string;
}

export function SelectTrigger({
  className,
  blur,
  size = "default",
  color = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={styles({ color, blur, className })}
      {...props}
    >
      {children}

      <BaseSelect.Icon>
        <ChevronDownIcon className="size-4 opacity-50" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}
