"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

export interface DialogRootProps extends BaseDialog.Root.Props {}

export function DialogRoot(props: DialogRootProps) {
  return <BaseDialog.Root data-slot="dialog-root" {...props} />;
}
