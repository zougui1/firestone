import { cn } from "~/ui/utils";

export interface InputGroupTextProps extends React.ComponentProps<"span"> {}

export function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return (
    <span
      className={cn(
        `text-muted-foreground flex items-center gap-2 text-sm
        [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}
    />
  );
}
