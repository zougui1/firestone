"use client";

import { Toast as BaseToast } from "@base-ui/react";

export interface ToastProviderProps extends BaseToast.Provider.Props {}

export function ToastProvider(props: ToastProviderProps) {
  return <BaseToast.Provider {...props} />;
}
