"use client";

import { useRef } from "react";
import { Dialog } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";
import { SheetClose } from "./SheetClose";

const styles = tv({
  base: `bg-background data-open:animate-in
    data-closed:animate-out fixed z-50 flex flex-col gap-4
    shadow-lg transition ease-in-out data-closed:duration-300
    data-open:duration-500`,

  variants: {
    side: {
      top: `data-closed:slide-out-to-top
        data-open:slide-in-from-top inset-x-0 top-0 h-auto border-b`,
      right: `data-closed:slide-out-to-right
        data-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4
        border-l sm:max-w-sm`,
      bottom: `data-closed:slide-out-to-bottom
        data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto
        border-t`,
      left: `data-closed:slide-out-to-left
        data-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4
        border-r sm:max-w-sm`,
    },
  },
});

export interface SheetPopupProps
  extends
    Omit<Dialog.Popup.Props, "className" | "children">,
    VariantProps<typeof styles> {
  className?: string;
  children?:
    | ((context: { close: () => void }) => React.ReactNode)
    | React.ReactNode;
}

export function SheetPopup({
  className,
  side = "right",
  children,
  ...props
}: SheetPopupProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    closeButtonRef.current?.click();
  };

  const renderChildren = () => {
    if (typeof children !== "function") return children;

    return (
      <>
        <SheetClose render={<button ref={closeButtonRef} hidden />} />
        {children({ close })}
      </>
    );
  };

  return (
    <Dialog.Popup
      data-slot="sheet-popup"
      data-side={side}
      className={styles({ side, className })}
      {...props}
    >
      {renderChildren()}
    </Dialog.Popup>
  );
}
