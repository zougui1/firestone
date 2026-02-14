"use client";

import { NumberField } from "@base-ui/react";

import { cn } from "~/ui/utils";

import { Button } from "../Button";

export interface NumberFieldIncrementProps
  extends NumberField.Increment.Props {}

export const NumberFieldIncrement = ({
  className,
  ...props
}: NumberFieldIncrementProps) => {
  return (
    <NumberField.Increment
      data-slot="number-field-increment"
      render={<Button color="neutral" />}
      {...props}
      className={cn("flex items-center justify-center select-none", className)}
    />
  );
};
