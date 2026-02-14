import { tv, type VariantProps } from "tailwind-variants";

import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  type IconProps,
} from "../../icons";

const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
};

const styles = tv({
  base: "",

  variants: {
    type: {
      success: "fill-success-light",
      error: "fill-destructive-light",
      info: "fill-info-light",
      warning: "fill-warning-light",
    },
  },
});

type ToastIconVariants = VariantProps<typeof styles>;

export interface ToastIconProps extends Omit<IconProps, "type"> {
  type?: string;
}

export const ToastIcon = ({ type, className, ...props }: ToastIconProps) => {
  if (!type || !(type in icons)) return;

  const Icon = icons[type as keyof typeof icons];

  return (
    <Icon
      {...props}
      className={styles({ type: type as ToastIconVariants["type"], className })}
    />
  );
};
