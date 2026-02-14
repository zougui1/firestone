"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "~/ui/utils";

const shadowTop = cn(`before:pointer-events-none before:absolute before:top-0
  before:left-0 before:block
  before:h-[min(40px,var(--scroll-area-overflow-y-start))]
  before:w-full
  before:bg-[linear-gradient(to_bottom,hsl(0_0_0/.35),transparent)]
  before:transition-[height] before:content-['']
  before:[--scroll-area-overflow-y-start:inherit]`);

const shadowBottom = cn(`after:pointer-events-none after:absolute after:bottom-0
  after:left-0 after:block
  after:h-[min(40px,var(--scroll-area-overflow-y-end))]
  after:w-full
  after:bg-[linear-gradient(to_top,hsl(0_0_0/.35),transparent)]
  after:transition-[height] after:content-['']
  after:[--scroll-area-overflow-y-end:inherit]`);

const shadowLeft = cn(`pointer-events-none absolute top-0 left-0 block h-full
  w-[min(40px,var(--scroll-area-overflow-x-start))]
  bg-[linear-gradient(to_right,hsl(0_0_0/.35),transparent)]
  transition-[height] content-['']
  [--scroll-area-overflow-x-start:inherit]`);

const shadowRight = cn(`pointer-events-none absolute top-0 right-0 block h-full
  w-[min(40px,var(--scroll-area-overflow-x-end))]
  bg-[linear-gradient(to_left,hsl(0_0_0/.35),transparent)]
  transition-[height] content-['']
  [--scroll-area-overflow-x-end:inherit]`);

const styles = tv({
  base: `min-h-0 flex-1 overscroll-contain pr-4`,

  slots: {
    shadowLeft: "",
    shadowRight: "",
  },

  variants: {
    shadow: {
      true: {
        base: [shadowTop, shadowBottom],
        shadowLeft,
        shadowRight,
      },
      y: {
        base: [shadowTop, shadowBottom],
      },
      top: {
        base: shadowTop,
      },
      bottom: {
        base: shadowBottom,
      },
      x: {
        shadowLeft,
        shadowRight,
      },
      left: { shadowLeft },
      right: { shadowRight },
    },
  },
});

export interface ScrollAreaViewportProps
  extends
    Omit<BaseScrollArea.Viewport.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export const ScrollAreaViewport = ({
  shadow,
  className,
  children,
  ...props
}: ScrollAreaViewportProps) => {
  const { base, shadowLeft, shadowRight } = styles({ shadow });

  const shadowLeftClassName = shadowLeft();
  const shadowRightClassName = shadowRight();

  return (
    <BaseScrollArea.Viewport
      data-slot="scroll-area-viewport"
      {...props}
      className={base({ className })}
    >
      {shadowLeftClassName && <div className={shadowLeftClassName} />}
      {shadowRightClassName && <div className={shadowRightClassName} />}

      {children}
    </BaseScrollArea.Viewport>
  );
};
