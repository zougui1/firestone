import { cn } from "~/ui/utils";

export interface CardTitleProps extends React.ComponentProps<"div"> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}
