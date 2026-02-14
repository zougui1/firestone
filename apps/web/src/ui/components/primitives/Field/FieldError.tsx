import { Field } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface FieldErrorProps extends Field.Error.Props {}

export const FieldError = ({ className, ...props }: FieldErrorProps) => {
  return (
    <Field.Error
      data-slot="field-error"
      {...props}
      className={cn("text-destructive text-sm font-normal", className)}
    />
  );
};
