"use client";

import { Select as BaseSelect } from "@base-ui/react";

export interface SelectArrowProps extends BaseSelect.Arrow.Props {}

export function SelectArrow(props: SelectArrowProps) {
  return <BaseSelect.Arrow data-slot="select-arrow" {...props} />;
}
