import { Loader2Icon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

export const spinnerStyles = tv({
  base: "size-5 animate-spin",
  variants: {
    color: {
      default: "text-default",
      neutral: "text-neutral",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
      info: "text-info",
    },
  },
});

export interface SpinnerProps
  extends
    Omit<React.ComponentProps<"svg">, "className" | "color">,
    VariantProps<typeof spinnerStyles> {
  className?: string;
}

export function Spinner({
  className,
  color = "default",
  ...props
}: SpinnerProps) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={spinnerStyles({ color, className })}
      {...props}
    />
  );
}
