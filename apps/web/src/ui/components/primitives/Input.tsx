import { Input as BaseInput } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `rounded-md flex items-center gap-2 h-9 w-full min-w-0 px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-2
    placeholder:text-muted-foreground
    file:text-foreground file:inline-flex file:h-7 file:border-0
    file:bg-transparent file:text-sm file:font-medium
    selection:bg-default selection:text-default-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,

  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light!`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`,
    },

    blur: {
      true: "backdrop-blur-xs",
    },
  },
});

export interface InputProps
  extends Omit<BaseInput.Props, "className">, VariantProps<typeof styles> {
  className?: string;
}

export const Input = ({
  className,
  color = "default",
  ...props
}: InputProps) => {
  return (
    <BaseInput
      data-slot="input"
      className={styles({ color, className })}
      {...props}
    />
  );
};
