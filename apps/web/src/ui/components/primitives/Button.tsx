import { Button as BaseButton } from "@base-ui/react";
import { tv, type VariantProps } from "tailwind-variants";
import { Spinner, type SpinnerProps } from "./Spinner";
import { cn } from "~/ui/utils";

export const buttonStyles = tv({
  base: `inline-flex items-center justify-center gap-1 shrink-0
    whitespace-nowrap text-sm font-medium
    rounded-sm cursor-pointer
    transition-all
    relative
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0
    focus-visible:outline-2 focus-visible:outline-offset-2
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,

  variants: {
    appearance: {
      solid: "shadow-sm",
      outline: `border-2 shadow-sm`,
      ghost: "",
      link: "underline-offset-4 hover:underline",
    },

    color: {
      default: "focus-visible:outline-default/80!",
      neutral: "focus-visible:outline-neutral/80!",
      primary: "focus-visible:outline-primary/80!",
      secondary: "focus-visible:outline-secondary!",
      success: "focus-visible:outline-success!",
      warning: "focus-visible:outline-warning!",
      destructive: "focus-visible:outline-destructive!",
      info: "focus-visible:outline-info!",
    },

    size: {
      default: `h-9 px-4 py-2
        has-[>svg:not([data-slot=button-spinner])]:px-3`,
      sm: `h-8 rounded-md gap-1.5 px-3
        has-[>svg:not([data-slot=button-spinner])]:px-2.5`,
      lg: `h-10 rounded-md px-6
        has-[>svg:not([data-slot=button-spinner])]:px-4`,
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },

    blur: {
      true: "backdrop-blur-sm",
    },
  },

  defaultVariants: {
    appearance: "solid",
    color: "default",
    size: "default",
  },

  compoundVariants: [
    //#region appearance=solid
    {
      appearance: "solid",
      color: "default",
      className: `bg-default text-default-foreground shadow-default/10
        hover:bg-default/90`,
    },
    {
      appearance: "solid",
      color: "neutral",
      className: `bg-neutral text-neutral-foreground shadow-neutral/10
        hover:bg-neutral-light`,
    },
    {
      appearance: "solid",
      color: "primary",
      className: `bg-primary text-primary-foreground shadow-primary/10
        hover:bg-primary-light`,
    },
    {
      appearance: "solid",
      color: "secondary",
      className: `bg-secondary text-secondary-foreground shadow-secondary/10
        hover:bg-secondary-light`,
    },
    {
      appearance: "solid",
      color: "success",
      className: `bg-success text-success-foreground shadow-success/10
        hover:bg-success-light`,
    },
    {
      appearance: "solid",
      color: "warning",
      className: `bg-warning text-warning-foreground shadow-warning/10
        hover:bg-warning-light`,
    },
    {
      appearance: "solid",
      color: "destructive",
      className: `bg-destructive text-white shadow-destructive/10
        hover:bg-destructive-light`,
    },
    {
      appearance: "solid",
      color: "info",
      className: `bg-info text-info-foreground shadow-info/10
        hover:bg-info-light`,
    },
    //#endregion

    //#region appearance=outline
    {
      appearance: "outline",
      color: "default",
      className: `text-default border-default! shadow-default/10
        hover:bg-default/20 hover:border-default/90!`,
    },
    {
      appearance: "outline",
      color: "neutral",
      className: `text-neutral-light border-neutral-light! shadow-neutral-light/10
        hover:bg-neutral-light/20 hover:border-[oklch(from_var(--neutral-light)_0.6_0_0)]!`,
    },
    {
      appearance: "outline",
      color: "primary",
      className: `text-primary border-primary! shadow-primary/10
        hover:bg-primary/20 hover:border-primary-light!`,
    },
    {
      appearance: "outline",
      color: "secondary",
      className: `text-secondary border-secondary! shadow-secondary/10
        hover:bg-secondary/20 hover:border-secondary-light!`,
    },
    {
      appearance: "outline",
      color: "success",
      className: `text-success border-success! shadow-success/10
        hover:bg-success/20 hover:border-success-light!`,
    },
    {
      appearance: "outline",
      color: "warning",
      className: `text-warning border-warning! shadow-warning/10
        hover:bg-warning/20 hover:border-warning-light!`,
    },
    {
      appearance: "outline",
      color: "destructive",
      className: `text-destructive border-destructive! shadow-destructive/10
        hover:bg-destructive/20 hover:border-destructive-light!`,
    },
    {
      appearance: "outline",
      color: "info",
      className: `text-info border-info! shadow-info/10
        hover:bg-info/20 hover:border-info-light!`,
    },
    //#endregion

    //#region appearance=ghost
    {
      appearance: "ghost",
      color: "default",
      className: `text-default
        hover:bg-default/20`,
    },
    {
      appearance: "ghost",
      color: "neutral",
      className: `text-neutral-light
        hover:bg-neutral-light/20`,
    },
    {
      appearance: "ghost",
      color: "primary",
      className: `text-primary
        hover:bg-primary/20`,
    },
    {
      appearance: "ghost",
      color: "secondary",
      className: `text-secondary hover:bg-secondary/20`,
    },
    {
      appearance: "ghost",
      color: "success",
      className: `text-success hover:bg-success/20`,
    },
    {
      appearance: "ghost",
      color: "warning",
      className: `text-warning hover:bg-warning/20`,
    },
    {
      appearance: "ghost",
      color: "destructive",
      className: `text-destructive
        hover:bg-destructive/20`,
    },
    {
      appearance: "ghost",
      color: "info",
      className: `text-info hover:bg-info/20`,
    },
    //#endregion

    //#region appearance=link
    {
      appearance: "link",
      color: "default",
      className: "text-default",
    },
    {
      appearance: "link",
      color: "neutral",
      className: "text-neutral-light",
    },
    {
      appearance: "link",
      color: "primary",
      className: "text-primary",
    },
    {
      appearance: "link",
      color: "secondary",
      className: "text-secondary",
    },
    {
      appearance: "link",
      color: "success",
      className: "text-success",
    },
    {
      appearance: "link",
      color: "warning",
      className: "text-warning",
    },
    {
      appearance: "link",
      color: "destructive",
      className: "text-destructive",
    },
    {
      appearance: "link",
      color: "info",
      className: "text-info",
    },
    //#endregion
  ],
});

const variants = {
  default: {
    appearance: "solid",
    color: "default",
  },
  primary: {
    appearance: "solid",
    color: "primary",
  },
  secondary: {
    appearance: "outline",
    color: "primary",
  },
  muted: {
    appearance: "outline",
    color: "neutral",
  },
} as const;

export interface ButtonProps
  extends BaseButton.Props, VariantProps<typeof buttonStyles> {
  variant?: keyof typeof variants;
  loading?: boolean;
  slotProps?: {
    spinner?: SpinnerProps;
  };
}

export function Button({
  className,
  variant = "default",
  appearance,
  color,
  size = "default",
  blur,
  loading,
  disabled,
  children,
  slotProps,
  ...props
}: ButtonProps) {
  const variantProps = {
    appearance: appearance ?? variants[variant].appearance,
    color: color ?? variants[variant].color,
  };

  return (
    <BaseButton
      data-slot="button"
      data-appearance={variantProps.appearance}
      data-size={size}
      data-color={variantProps.color}
      data-blur={blur ? "true" : undefined}
      data-loading={loading ? "true" : undefined}
      className={buttonStyles({
        ...variantProps,
        size,
        blur,
        className: String(className ?? ""),
      })}
      disabled={disabled || loading}
      {...props}
    >
      {children}

      {loading && (
        <Spinner
          data-slot="button-spinner"
          color={color === "default" ? "neutral" : "default"}
          {...slotProps?.spinner}
          className={cn(
            `absolute top-0 right-0 size-4.5 translate-x-1.5 -translate-y-1.5
            rounded-full`,
            slotProps?.spinner?.className,
          )}
        />
      )}
    </BaseButton>
  );
}
