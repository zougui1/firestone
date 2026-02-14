"use client";

import { useRef, useState } from "react";
import { Toast } from "@base-ui/react";

import { Button, type ButtonProps, Toast as ZToast } from "../primitives";

function AnchoredToasts() {
  const { toasts } = ZToast.useManager();

  return (
    <Toast.Portal>
      <Toast.Viewport className="outline-0">
        {toasts.map((toast) => (
          <Toast.Positioner
            key={toast.id}
            toast={toast}
            className="z-[calc(1000-var(--toast-index))]"
          >
            <Toast.Root toast={toast}>
              <Toast.Arrow
                className="bg-background-light z-50 size-2.5 rounded-[2px]
                  shadow-md data-[side=bottom]:-top-1
                  data-[side=bottom]:rotate-45 data-[side=left]:-right-1
                  data-[side=left]:rotate-45 data-[side=right]:-left-1
                  data-[side=right]:-rotate-45 data-[side=top]:-bottom-1
                  data-[side=top]:-rotate-45"
              />

              <Toast.Content
                className="bg-background-light text-tooltip-foreground relative
                  z-50 flex h-(--popup-height,auto) w-fit max-w-[500px]
                  origin-(--transform-origin) items-center rounded-md px-3
                  py-1.5 text-xs text-balance
                  transition-[opacity,transform,width,height]
                  data-ending-style:scale-90 data-ending-style:opacity-0
                  data-instant:transition-none data-starting-style:scale-90
                  data-starting-style:opacity-0"
              >
                <ZToast.Icon type={toast.type} className="mr-2" />

                <div>
                  <Toast.Title />
                  <Toast.Description />
                </div>
              </Toast.Content>
            </Toast.Root>
          </Toast.Positioner>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export interface ToastButtonProps extends Omit<ButtonProps, "onClick"> {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>,
    toastManager: ZToast.Manager,
  ) => void;
  disabledByToast?: boolean;
}

export const ToastButton = ({
  onClick,
  disabled: disabledProps,
  disabledByToast: disabledByToastProps,
  ...props
}: ToastButtonProps) => {
  const [toastManager] = useState(() => ZToast.createManager());
  const [toastId, setToastId] = useState<string | undefined>();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toastOpen = !!toastId;
  const disabledByToast = disabledByToastProps && toastOpen;
  const disabled = disabledProps || disabledByToast;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (toastId) {
      toastManager.close(toastId);
    }

    const adder =
      (add: ZToast.Manager["add"]) =>
      (data: ZToast.ManagerAddOptions<object>) => {
        const newToastId = add.call(toastManager, {
          timeout: 1500,
          ...data,
          positionerProps: {
            anchor: buttonRef.current,
            sideOffset: 8,
            ...data.positionerProps,
          },
          onClose() {
            setToastId(undefined);
            data.onClose?.();
          },
        });

        setToastId(newToastId);
        return newToastId;
      };

    onClick?.(event, {
      ...toastManager,
      add: adder(toastManager.add),
      success: adder(toastManager.success),
      error: adder(toastManager.error),
      info: adder(toastManager.info),
      warning: adder(toastManager.warning),
      update: toastManager.update.bind(toastManager),
      close: toastManager.close.bind(toastManager),
      promise: toastManager.promise.bind(toastManager),
    });
  }

  return (
    <Toast.Provider toastManager={toastManager}>
      <AnchoredToasts />
      <Button
        ref={buttonRef}
        focusableWhenDisabled={disabledByToast}
        {...props}
        disabled={disabled}
        onClick={handleClick}
      />
    </Toast.Provider>
  );
};
