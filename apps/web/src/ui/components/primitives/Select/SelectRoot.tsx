"use client";

import { Select as BaseSelect } from "@base-ui/react";

export interface SelectRootProps<
  Value,
  Multiple extends boolean | undefined = false,
> extends BaseSelect.Root.Props<Value, Multiple> {}

export function SelectRoot<Value, Multiple extends boolean | undefined = false>(
  props: SelectRootProps<Value, Multiple>,
) {
  return <BaseSelect.Root data-slot="select-root" {...props} />;
}
