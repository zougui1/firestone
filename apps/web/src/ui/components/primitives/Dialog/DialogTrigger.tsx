"use client";

import { Dialog as BaseDialog } from "@base-ui/react";

export interface DialogTriggerProps extends BaseDialog.Trigger.Props {}

export function DialogTrigger(props: DialogTriggerProps) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}
