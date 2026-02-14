import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `flex flex-col gap-6 rounded-lg py-6
    shadow-md border`,

  variants: {
    color: {
      default: "bg-background",
      primary: "bg-primary/10 border-primary/30!",
      secondary: "bg-secondary/10 border-secondary/30!",
      success: "bg-success/10 border-success/30!",
      warning: "bg-warning/10 border-warning/30!",
      destructive: "bg-destructive/10 border-destructive/30!",
      info: "bg-info/10 border-info/30!",
    },

    blur: {
      true: "backdrop-blur-xs",
    },
  },
});

export interface CardRootProps
  extends
    Omit<React.ComponentProps<"div">, "color">,
    VariantProps<typeof styles> {}

export function CardRoot({
  className,
  color = "default",
  blur,
  ...props
}: CardRootProps) {
  return (
    <div
      data-slot="card-root"
      data-color={color}
      data-blur={blur ? "true" : undefined}
      className={styles({ className, color, blur })}
      {...props}
    />
  );
}
