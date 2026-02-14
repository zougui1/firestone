import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: "container mx-auto min-h-screen px-6 py-4",

  variants: {
    variant: {
      solid: "bg-background-dark",
      transparent: "bg-background/85 shadow-x-xl! shadow-primary/10",
    },

    blur: {
      true: "backdrop-blur-xs",
    },
  },

  defaultVariants: {
    variant: "solid",
  },
});

export interface ContainerProps
  extends React.ComponentProps<"div">, VariantProps<typeof styles> {}

export const Container = ({
  variant,
  blur,
  className,
  ...props
}: ContainerProps) => {
  return <div {...props} className={styles({ variant, blur, className })} />;
};
