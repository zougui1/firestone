import { cn } from "~/ui/utils";

export interface CardContentProps extends React.ComponentProps<"div"> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}
