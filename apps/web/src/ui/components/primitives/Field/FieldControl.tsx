import { Field } from "@base-ui/react";

import { cn } from "~/ui/utils";
import { Input, type InputProps } from "../Input";

export interface FieldControlProps
  extends Field.Control.Props, Pick<InputProps, "color"> {}

export const FieldControl = ({
  className,
  color,
  ...props
}: FieldControlProps) => {
  return (
    <Field.Control
      data-slot="field-control"
      render={<Input color={color} data-slot="field-control" />}
      {...props}
      className={cn("", className)}
    />
  );
};
