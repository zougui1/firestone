"use client";

import { Dialog as BaseDialog } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `fixed inset-0 isolate bg-black/50 duration-100
    data-starting-style:opacity-0
    data-ending-style:opacity-0`,

  variants: {
    blur: {
      true: "supports-backdrop-filter:backdrop-blur-xs",
    },
  },
});

export interface DialogBackdropProps
  extends
    Omit<BaseDialog.Backdrop.Props, "className">,
    VariantProps<typeof styles> {
  className?: string;
}

export function DialogBackdrop({
  blur,
  className,
  ...props
}: DialogBackdropProps) {
  return (
    <BaseDialog.Backdrop
      data-slot="dialog-backdrop"
      className={styles({ blur, className })}
      {...props}
    />
  );
}
