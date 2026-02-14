import { Field } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface FieldDescriptionProps extends Field.Description.Props {}

export const FieldDescription = ({
  className,
  ...props
}: FieldDescriptionProps) => {
  return (
    <Field.Description
      data-slot="field-description"
      {...props}
      className={cn(
        `text-muted-foreground text-sm leading-normal font-normal last:mt-0
        nth-last-2:-mt-1`,
        className,
      )}
    />
  );
};
