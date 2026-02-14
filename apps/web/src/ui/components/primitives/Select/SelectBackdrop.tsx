"use client";

import { Select as BaseSelect } from "@base-ui/react";

export interface SelectBackdropProps extends BaseSelect.Backdrop.Props {}

export function SelectBackdrop(props: SelectBackdropProps) {
  return <BaseSelect.Backdrop data-slot="select-backdrop" {...props} />;
}
