import { cn } from "~/ui/utils";

export interface CardHeaderProps extends React.ComponentProps<"div"> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `@container/card-header grid auto-rows-min grid-rows-[auto_auto]
        items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]
        [.border-b]:pb-6`,
        className,
      )}
      {...props}
    />
  );
}
