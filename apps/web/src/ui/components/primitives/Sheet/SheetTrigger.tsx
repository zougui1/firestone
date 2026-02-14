"use client";

import { Dialog } from "@base-ui/react";

export interface SheetTriggerProps extends Dialog.Trigger.Props {}

export function SheetTrigger(props: SheetTriggerProps) {
  return <Dialog.Trigger data-slot="sheet-trigger" {...props} />;
}
