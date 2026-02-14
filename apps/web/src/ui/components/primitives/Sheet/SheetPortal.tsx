"use client";

import { Dialog } from "@base-ui/react";

export interface SheetPortalProps extends Dialog.Portal.Props {}

export function SheetPortal(props: SheetPortalProps) {
  return <Dialog.Portal data-slot="sheet-portal" {...props} />;
}
