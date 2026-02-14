"use client";

import { Dialog } from "@base-ui/react";

export interface SheetRootProps extends Dialog.Root.Props {}

export function SheetRoot(props: SheetRootProps) {
  return <Dialog.Root data-slot="sheet-root" {...props} />;
}
