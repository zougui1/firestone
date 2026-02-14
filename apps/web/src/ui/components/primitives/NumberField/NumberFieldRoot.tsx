"use client";

import { NumberField } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface NumberFieldRootProps extends NumberField.Root.Props {}

export const NumberFieldRoot = ({
  className,
  ...props
}: NumberFieldRootProps) => {
  return (
    <NumberField.Root
      data-slot="number-field-root"
      {...props}
      className={cn("inline-flex flex-col gap-1", className)}
    />
  );
};
