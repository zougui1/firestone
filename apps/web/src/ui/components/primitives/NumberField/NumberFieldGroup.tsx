"use client";

import { NumberField } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface NumberFieldGroupProps extends NumberField.Group.Props {}

export const NumberFieldGroup = ({
  className,
  ...props
}: NumberFieldGroupProps) => {
  return (
    <NumberField.Group
      data-slot="number-field-group"
      {...props}
      className={cn("flex", className)}
    />
  );
};
