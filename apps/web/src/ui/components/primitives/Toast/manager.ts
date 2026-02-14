import {
  Toast,
  type ToastManager as BaseToastManager,
  type ToastManagerAddOptions,
  type UseToastManagerReturnValue as BaseUseToastManagerReturnValue,
} from "@base-ui/react";

export type { ToastManagerAddOptions };

interface ExtraMethods {
  success: <Data extends object>(
    options: Omit<ToastManagerAddOptions<Data>, "type">,
  ) => string;
  warning: <Data extends object>(
    options: Omit<ToastManagerAddOptions<Data>, "type">,
  ) => string;
  error: <Data extends object>(
    options: Omit<ToastManagerAddOptions<Data>, "type">,
  ) => string;
  info: <Data extends object>(
    options: Omit<ToastManagerAddOptions<Data>, "type">,
  ) => string;
}

export interface ToastManager extends BaseToastManager, ExtraMethods {}

export const createToastManager = (): ToastManager => {
  const toastManager = Toast.createToastManager();
  const add = toastManager.add.bind(toastManager);

  const creator =
    (type: string) =>
    <Data extends object>(data: Omit<ToastManagerAddOptions<Data>, "type">) => {
      return add({
        type,
        ...data,
      });
    };

  return {
    ...toastManager,
    " subscribe": toastManager[" subscribe"].bind(toastManager),
    add,
    close: toastManager.close.bind(toastManager),
    promise: toastManager.promise.bind(toastManager),
    update: toastManager.update.bind(toastManager),

    success: creator("success"),
    error: creator("error"),
    info: creator("info"),
    warning: creator("warning"),
  };
};

export interface UseToastManagerReturnValue
  extends BaseUseToastManagerReturnValue, ExtraMethods {}

export const useToastManager = (): UseToastManagerReturnValue => {
  return Toast.useToastManager() as UseToastManagerReturnValue;
};
