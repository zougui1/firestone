import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `rounded-md flex items-center gap-2 w-full px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-2
    placeholder:text-muted-foreground
    selection:bg-default selection:text-default-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-3 aria-invalid:ring-destructive/35
    field-sizing-content min-h-16`,

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
  },
});

export interface TextareaProps
  extends
    Omit<React.ComponentProps<"textarea">, "color">,
    VariantProps<typeof styles> {}

export function Textarea({
  className,
  color = "default",
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-color={color}
      className={styles({ color, className })}
      {...props}
    />
  );
}
