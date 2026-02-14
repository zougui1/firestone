import { tv, type VariantProps } from "tailwind-variants";

import { Button, type ButtonProps } from "../Button";

const inputGroupButtonVariants = tv({
  base: "gap-2 text-sm shadow-none flex items-center",
  variants: {
    size: {
      xs: `h-6 gap-1
        rounded-[calc(var(--radius)-3px)] px-1.5
        [&>svg:not([class*='size-'])]:size-3.5`,
      sm: "",
      "icon-xs": `size-6
        rounded-[calc(var(--radius)-3px)] p-0
        has-[>svg]:p-0`,
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

export interface InputGroupButtonProps
  extends
    Omit<ButtonProps, "size" | "className">,
    VariantProps<typeof inputGroupButtonVariants> {
  className?: string;
}

export function InputGroupButton({
  className,
  type = "button",
  appearance = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      appearance={appearance}
      className={inputGroupButtonVariants({ size, className })}
      {...props}
    />
  );
}
