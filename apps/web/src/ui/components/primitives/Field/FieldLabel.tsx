import { Field } from "@base-ui/react";

import { cn } from "~/ui/utils";

export interface FieldLabelProps extends Field.Label.Props {}

export const FieldLabel = ({ className, ...props }: FieldLabelProps) => {
  return (
    <Field.Label
      data-slot="field-label"
      {...props}
      className={cn(
        `text-sm font-medium
        has-[switch,checkbox,radio,[role=switch],[role=checkbox],[role=radio]]:flex
        has-[switch,checkbox,radio,[role=switch],[role=checkbox],[role=radio]]:items-center
        has-[switch,checkbox,radio,[role=switch],[role=checkbox],[role=radio]]:gap-1`,
        className,
      )}
    />
  );
};
