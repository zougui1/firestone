"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { tv } from "tailwind-variants";

const styles = tv({
  base: `pointer-events-none relative m-2 flex
    opacity-0 transition-[opacity,width,height] rounded-md
    data-hovering:pointer-events-auto
    data-hovering:opacity-100
    data-scrolling:pointer-events-auto
    data-scrolling:opacity-100
    before:absolute before:content-['']`,

  variants: {
    orientation: {
      vertical: `w-1 hover:w-2 before:top-0 before:right-0
        before:bottom-0 before:h-full before:w-5`,
      horizontal: `h-1 hover:h-2 before:right-0 before:bottom-0
        before:left-0 before:h-5 before:w-full`,
    },
  },

  defaultVariants: {
    orientation: "vertical",
  },
});

export interface ScrollAreaScrollbarProps extends Omit<
  BaseScrollArea.Scrollbar.Props,
  "className"
> {
  className?: string;
}

export const ScrollAreaScrollbar = ({
  orientation,
  className,
  ...props
}: ScrollAreaScrollbarProps) => {
  return (
    <BaseScrollArea.Scrollbar
      data-slot="scroll-area-scrollbar"
      {...props}
      orientation={orientation}
      className={styles({ orientation, className })}
    />
  );
};
