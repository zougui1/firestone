import { cn } from "~/ui/utils";

export interface TypographyMutedProps extends React.ComponentProps<"p"> {}

export const TypographyMuted = ({
  className,
  ...props
}: TypographyMutedProps) => {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
};
