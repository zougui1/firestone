import { tv, type VariantProps } from 'tailwind-variants';

const styles = tv({
  slots: {
    base: 'relative inline-flex flex-col gap-2 items-center justify-center',
    wrapper: 'relative flex text-foreground size-5 animate-spin',
    label: 'text-foreground dark:text-foreground-dark font-regular',
    circle1: 'absolute w-full h-full rounded-full opacity-25',
    circle2: 'absolute w-full h-full rounded-full opacity-75',
  },

  variants: {
    size: {
      sm: {
        wrapper: 'w-5 h-5',
        circle1: 'border-2',
        circle2: 'border-2',
        label: 'text-small',
      },
      md: {
        wrapper: 'w-8 h-8',
        circle1: 'border-3',
        circle2: 'border-3',
        label: 'text-medium',
      },
      lg: {
        wrapper: 'w-10 h-10',
        circle1: 'border-3',
        circle2: 'border-3',
        label: 'text-large',
      },
    },

    color: {
      current: {
        wrapper: 'text-current',
        circle1: 'border-b-current',
        circle2: 'border-b-current',
        dots: 'bg-current',
        spinnerBars: 'bg-current',
      },
      primary: {
        wrapper: 'text-primary',
        circle1: 'border-b-primary',
        circle2: 'border-b-primary',
        dots: 'bg-primary',
        spinnerBars: 'bg-primary',
      },
      secondary: {
        wrapper: 'text-secondary',
        circle1: 'border-b-secondary',
        circle2: 'border-b-secondary',
        dots: 'bg-secondary',
        spinnerBars: 'bg-secondary',
      },
      success: {
        wrapper: 'text-success',
        circle1: 'border-b-success',
        circle2: 'border-b-success',
        dots: 'bg-success',
        spinnerBars: 'bg-success',
      },
      warning: {
        wrapper: 'text-warning',
        circle1: 'border-b-warning',
        circle2: 'border-b-warning',
        dots: 'bg-warning',
        spinnerBars: 'bg-warning',
      },
      destructive: {
        wrapper: 'text-destructive',
        circle1: 'border-b-destructive',
        circle2: 'border-b-destructive',
        dots: 'bg-destructive',
        spinnerBars: 'bg-destructive',
      },
    },

    labelColor: {
      foreground: {
        label: 'text-foreground',
      },
      primary: {
        label: 'text-primary',
      },
      secondary: {
        label: 'text-secondary',
      },
      success: {
        label: 'text-success',
      },
      warning: {
        label: 'text-warning',
      },
      destructive: {
        label: 'text-destructive',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    color: 'primary',
    labelColor: 'foreground',
  },
});

export const Spinner = ({
  size,
  color,
  labelColor,
  classes,
  label,
  className,
  ...props
}: SpinnerProps) => {
  const slots = styles({ size, color, labelColor });

  return (
    <div
      className={slots.base({ className })}
      {...props}
      aria-label={label ?? props['aria-label'] ?? 'Loading'}
    >
      <svg
        className={slots.wrapper({ class: classes?.wrapper })}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className={slots.circle1({ class: classes?.circle1 })}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className={slots.circle2({ class: classes?.circle2 })}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>

      {label && <span className={slots.label({ class: classes?.label })}>{label}</span>}
    </div>
  );
}

export interface SpinnerProps extends Omit<React.ComponentProps<'div'>, 'color'>, VariantProps<typeof styles> {
  classes?: Partial<Record<'wrapper' | 'label' | 'circle1' | 'circle2', string>>;
  label?: string;
}
