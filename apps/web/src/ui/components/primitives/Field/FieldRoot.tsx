import { Field } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: "flex gap-1",

  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal: `flex-row items-center
        *:data-[slot=field-label]:flex-auto
        has-[>[data-slot=field-control]]:items-start
        has-[>[data-slot=field-control]]:[&>[role=checkbox],[role=radio]]:mt-px`,
      responsive: `flex-col *:w-full [&>.sr-only]:w-auto
        @md/field-group:flex-row
        @md/field-group:items-center
        @md/field-group:*:w-auto
        @md/field-group:*:data-[slot=field-label]:flex-auto
        @md/field-group:has-[>[data-slot=field-control]]:items-start
        @md/field-group:has-[>[data-slot=field-control]]:[&>[role=checkbox],[role=radio]]:mt-px`,
    },
  },

  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface FieldRootProps
  extends Omit<Field.Root.Props, "className">, VariantProps<typeof styles> {
  className?: string;
}

export const FieldRoot = ({
  className,
  orientation = "vertical",
  ...props
}: FieldRootProps) => {
  return (
    <Field.Root
      data-slot="field-root"
      data-orientation={orientation}
      {...props}
      className={styles({ orientation, className })}
    />
  );
};
