"use client";

import { Select as BaseSelect } from "@base-ui/react";
import { CheckIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `
    relative
    flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8
    pl-2 text-sm outline-hidden select-none
    data-disabled:pointer-events-none data-disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex
    *:[span]:last:items-center *:[span]:last:gap-2`,

  slots: {
    indicator: `text-primary pointer-events-none absolute flex
      size-4 items-center justify-center`,
    wrapper: "flex items-center gap-2",
  },

  variants: {
    variant: {
      default: "focus:bg-accent focus:text-accent-foreground",
      destructive:
        "text-destructive focus:bg-destructive-dark focus:text-destructive-foreground focus:[&_svg]:text-foreground",
    },

    indicatorPosition: {
      start: {
        wrapper: "pl-6",
        indicator: "left-2",
      },
      end: {
        indicator: "right-2",
      },
    },
  },

  defaultVariants: {
    variant: "default",
    indicatorPosition: "end",
  },
});

export interface SelectItemProps
  extends
    Omit<BaseSelect.Item.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
  icon?: React.ReactNode;
  indicatorPosition?: "start" | "end";
}

export function SelectItem({
  className,
  variant,
  children,
  icon,
  indicatorPosition = "end",
  ...props
}: SelectItemProps) {
  const { base, indicator, wrapper } = styles({ variant, indicatorPosition });

  return (
    <BaseSelect.Item
      data-slot="select-item"
      className={base({
        className,
      })}
      {...props}
    >
      <div className={wrapper()}>
        {icon}

        <BaseSelect.ItemText
          className="flex flex-1 shrink-0 gap-2 whitespace-nowrap"
        >
          {children}
        </BaseSelect.ItemText>
      </div>

      <BaseSelect.ItemIndicator render={<span className={indicator()} />}>
        <CheckIcon className="pointer-events-none" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
