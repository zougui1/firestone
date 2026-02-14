"use client";

import { NumberField } from "@base-ui/react";

export interface NumberFieldScrubAreaCursorProps
  extends NumberField.ScrubAreaCursor.Props {}

export const NumberFieldScrubAreaCursor = (
  props: NumberFieldScrubAreaCursorProps,
) => {
  return (
    <NumberField.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      {...props}
    />
  );
};
