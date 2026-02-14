import { tv, type VariantProps } from "tailwind-variants";

const headerStyles = tv({
  base: "",
  variants: {
    sticky: {
      true: "bg-background sticky top-0 z-10 shadow-md",
    },

    borderless: {
      true: "",
    },
  },

  compoundVariants: [
    {
      sticky: true,
      borderless: false,
      className: `after:absolute after:bottom-0 after:h-px after:w-full
        after:border-b after:border-border`,
    },
  ],
});

export interface TableHeaderProps
  extends React.ComponentProps<"thead">, VariantProps<typeof headerStyles> {}

export function TableHeader({
  className,
  sticky,
  borderless,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      data-slot="table-header"
      className={headerStyles({ sticky, borderless, className })}
      {...props}
    />
  );
}
