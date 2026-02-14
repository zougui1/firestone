"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `overscroll-contain`,

  variants: {
    vertical: {
      true: "",
    },

    horizontal: {
      true: "",
    },
  },
});

export interface ScrollAreaContentProps
  extends
    Omit<BaseScrollArea.Content.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export const ScrollAreaContent = (props: ScrollAreaContentProps) => {
  return <BaseScrollArea.Content data-slot="scroll-area-content" {...props} />;
};
