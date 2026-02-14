"use client";

import { NumberField } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface NumberFieldScrubAreaProps
  extends NumberField.ScrubArea.Props {}

export const NumberFieldScrubArea = ({
  className,
  ...props
}: NumberFieldScrubAreaProps) => {
  return (
    <NumberField.ScrubArea
      data-slot="number-field-scrub-area"
      {...props}
      className={cn("cursor-ew-resize", className)}
    />
  );
};
