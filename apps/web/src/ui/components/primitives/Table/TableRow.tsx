import { tv, type VariantProps } from "tailwind-variants";

const rowStyles = tv({
  base: `data-[state=selected]:bg-accent
    transition-all`,

  variants: {
    hoverEffect: {
      none: "",
      highlight: "hover:bg-accent/50",
    },

    borderless: {
      false: "border-b",
    },
  },
});

export interface TableRowProps
  extends React.ComponentProps<"tr">, VariantProps<typeof rowStyles> {}

export function TableRow({
  className,
  borderless,
  hoverEffect = "none",
  ...props
}: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={rowStyles({ hoverEffect, borderless, className })}
      {...props}
    />
  );
}
