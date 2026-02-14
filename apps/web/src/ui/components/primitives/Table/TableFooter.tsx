import { tv, type VariantProps } from "tailwind-variants";

const footerStyles = tv({
  base: "font-medium [&>tr]:last:border-b-0",

  variants: {
    borderless: {
      false: "border-t",
    },
  },
});

export interface TableFooterProps
  extends React.ComponentProps<"tfoot">, VariantProps<typeof footerStyles> {}

export function TableFooter({
  className,
  borderless,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      data-slot="table-footer"
      className={footerStyles({ borderless, className })}
      {...props}
    />
  );
}
