"use client";

import { NumberField } from "@base-ui/react";

import { cn } from "~/ui/utils";

import { Button } from "../Button";

export interface NumberFieldDecrementProps
  extends NumberField.Decrement.Props {}

export const NumberFieldDecrement = ({
  className,
  ...props
}: NumberFieldDecrementProps) => {
  return (
    <NumberField.Decrement
      data-slot="number-field-decrement"
      render={<Button color="neutral" />}
      {...props}
      className={cn("flex items-center justify-center select-none", className)}
    />
  );
};
