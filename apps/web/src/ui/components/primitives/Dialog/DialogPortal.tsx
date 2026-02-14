"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

export interface DialogPortalProps extends BaseDialog.Portal.Props {}

export function DialogPortal(props: DialogPortalProps) {
  return <BaseDialog.Portal data-slot="dialog-portal" {...props} />;
}
