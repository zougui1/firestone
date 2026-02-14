import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `animate-pulse rounded-md`,

  variants: {
    color: {
      default: `bg-background-light`,
      neutral: `bg-neutral/20`,
      primary: `bg-primary/20`,
      secondary: `bg-secondary/20`,
      success: `bg-success/20`,
      warning: `bg-warning/20`,
      destructive: `bg-destructive/20`,
      info: `bg-info/20`,
    },
  },
});

export interface SkeletonProps
  extends
    Omit<React.ComponentProps<"div">, "color">,
    VariantProps<typeof styles> {}

export function Skeleton({
  className,
  color = "default",
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={styles({ color, className })}
      {...props}
    />
  );
}
