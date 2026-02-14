"use client";

import { useRender } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const footerStyles = tv({
  base: "px-4 py-3",

  variants: {
    borderless: {
      false: "border-t",
    },
  },
});

export interface DataTableFooterProps
  extends useRender.ComponentProps<"div">, VariantProps<typeof footerStyles> {}

export const DataTableFooter = ({
  className,
  borderless,
  render,
  ...props
}: DataTableFooterProps) => {
  const element = useRender({
    defaultTagName: "div",
    render,
    props: {
      ...props,
      className: footerStyles({ borderless, className }),
    },
  });

  return element;
};
