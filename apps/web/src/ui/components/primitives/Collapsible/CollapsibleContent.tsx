"use client";

import { Collapsible as BaseCollapsible } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `transition-all overflow-hidden
    [&[hidden]:not([hidden='until-found'])]:hidden`,

  variants: {
    vertical: {
      true: `h-(--collapsible-panel-height)
        data-ending-style:h-0 data-starting-style:h-0`,
    },

    horizontal: {
      true: `w-(--collapsible-panel-height)
        data-ending-style:w-0 data-starting-style:w-0`,
    },
  },
});

export interface CollapsibleContentProps
  extends
    Omit<BaseCollapsible.Panel.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export function CollapsibleContent({
  className,
  vertical = true,
  horizontal,
  ...props
}: CollapsibleContentProps) {
  return (
    <BaseCollapsible.Panel
      data-slot="collapsible-content"
      {...props}
      className={styles({ vertical, horizontal, className })}
    />
  );
}
