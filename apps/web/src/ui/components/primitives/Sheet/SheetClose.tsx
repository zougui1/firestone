"use client";

import { Dialog } from "@base-ui/react";

export interface SheetCloseProps extends Dialog.Close.Props {}

export function SheetClose(props: SheetCloseProps) {
  return <Dialog.Close data-slot="sheet-close" {...props} />;
}
