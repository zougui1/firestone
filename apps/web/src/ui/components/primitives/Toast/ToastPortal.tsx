"use client";

import { Toast as BaseToast } from "@base-ui/react";

export interface ToastPortalProps extends BaseToast.Portal.Props {}

export function ToastPortal(props: ToastPortalProps) {
  return <BaseToast.Portal data-slot="toast-portal" {...props} />;
}
