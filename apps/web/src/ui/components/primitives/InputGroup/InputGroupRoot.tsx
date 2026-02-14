import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  base: `
    has-[[data-slot=input-group-control]:focus-visible]:outline-solid
    has-[[data-slot=input-group-control]:focus-visible]:outline-2
    has-[[data-slot=input-group-control]:focus-visible]:outline-offset-2
    has-[[data-slot][aria-invalid=true]]:ring-destructive/35
    has-[[data-slot][aria-invalid=true]]:ring-3
    group/input-group
    relative flex h-9 w-full min-w-0 items-center rounded-lg
    transition-colors outline-none has-disabled:opacity-50
    has-[>[data-align=block-end]]:h-auto
    has-[>[data-align=block-end]]:flex-col
    has-[>[data-align=block-start]]:h-auto
    has-[>[data-align=block-start]]:flex-col
    has-[>textarea]:h-auto
    has-[>[data-align=block-end]]:[&>input]:pt-3
    has-[>[data-align=block-start]]:[&>input]:pb-3
    has-[>[data-align=inline-end]]:[&>input]:pr-1.5
    has-[>[data-align=inline-start]]:[&>input]:pl-1.5
    [[data-slot=combobox-content]_&]:focus-within:border-inherit
    [[data-slot=combobox-content]_&]:focus-within:ring-0`,

  variants: {
    color: {
      default: `bg-background-light
        has-[[data-slot=input-group-control]:focus-visible]:outline-background-light!`,
      neutral: `bg-neutral
        data-[slot=input-group-control]:placeholder:text-neutral-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-neutral!`,
      primary: `bg-primary
        **:text-primary-foreground
        **:placeholder:text-primary-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-primary!`,
      secondary: `bg-secondary
        **:text-secondary-foreground
        **:placeholder:text-secondary-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-secondary!`,
      success: `bg-success
        **:text-success-foreground
        **:placeholder:text-success-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-success!`,
      warning: `bg-warning
        **:text-warning-foreground
        **:placeholder:text-warning-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-warning!`,
      destructive: `bg-destructive
        **:text-destructive-foreground
        **:placeholder:text-destructive-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-destructive!`,
      info: `bg-info
        **:text-info-foreground
        **:placeholder:text-info-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-info!`,
    },
  },
});

export interface InputGroupRootProps
  extends
    Omit<React.ComponentProps<"div">, "color">,
    VariantProps<typeof styles> {}

export function InputGroupRoot({
  className,
  color = "default",
  ...props
}: InputGroupRootProps) {
  return (
    <div
      data-slot="input-group-root"
      role="group"
      className={styles({ color, className })}
      {...props}
    />
  );
}
