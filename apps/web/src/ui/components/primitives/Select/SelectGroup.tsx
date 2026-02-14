"use client";

import { Select as BaseSelect } from "@base-ui/react";

export interface SelectGroupProps extends BaseSelect.Group.Props {}

export function SelectGroup(props: SelectGroupProps) {
  return <BaseSelect.Group data-slot="select-group" {...props} />;
}
