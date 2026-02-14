"use client";

import { useRef } from "react";
import { Dialog as BaseDialog } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";
import { DialogClose } from "./DialogClose";

const styles = tv({
  base: `
    data-starting-style:opacity-0 data-starting-style:scale-95
    data-ending-style:opacity-0 data-ending-style:scale-95
    ring-foreground/10 group/alert-dialog-content fixed
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    gap-6 rounded-md p-6 ring-1 duration-150 outline-none
    container w-auto shadow-lg flex flex-col max-h-11/12
    min-w-[100px] md:min-w-[min(100%,400px)] transition-all
    scale-[calc(1-0.1*var(--nested-dialogs))] translate-y-[calc(-50%+1.25rem*var(--nested-dialogs))]
    bg-background border`,

  variants: {},

  defaultVariants: {},
});

export interface DialogPopupProps
  extends
    Omit<BaseDialog.Popup.Props, "className" | "children">,
    VariantProps<typeof styles> {
  className?: string;
  children?:
    | ((context: { close: () => void }) => React.ReactNode)
    | React.ReactNode;
}

export function DialogPopup({
  className,
  children,
  ...props
}: DialogPopupProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    closeButtonRef.current?.click();
  };

  const renderChildren = () => {
    if (typeof children !== "function") return children;

    return (
      <>
        <DialogClose render={<button ref={closeButtonRef} hidden />} />
        {children({ close })}
      </>
    );
  };

  return (
    <BaseDialog.Popup
      data-slot="dialog-popup"
      {...props}
      className={styles({ className })}
    >
      {renderChildren()}
    </BaseDialog.Popup>
  );
}
