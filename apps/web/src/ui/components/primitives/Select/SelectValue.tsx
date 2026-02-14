"use client";

import { Select as BaseSelect } from "@base-ui/react";

export interface SelectValueProps extends BaseSelect.Value.Props {}

export function SelectValue(props: SelectValueProps) {
  return <BaseSelect.Value data-slot="select-value" {...props} />;
}
