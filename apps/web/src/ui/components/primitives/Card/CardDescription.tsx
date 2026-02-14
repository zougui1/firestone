import { cn } from "~/ui/utils";

export interface CardDescriptionProps extends React.ComponentProps<"div"> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
