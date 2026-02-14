import { Field } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface FieldItemProps extends Field.Item.Props {}

export const FieldItem = ({ className, ...props }: FieldItemProps) => {
  return (
    <Field.Item
      data-slot="field-item"
      {...props}
      className={cn("", className)}
    />
  );
};
