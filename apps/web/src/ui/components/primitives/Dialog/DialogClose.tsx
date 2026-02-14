"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

export interface DialogCloseProps extends BaseDialog.Close.Props {}

export function DialogClose(props: DialogCloseProps) {
  return <BaseDialog.Close data-slot="dialog-close" {...props} />;
}
