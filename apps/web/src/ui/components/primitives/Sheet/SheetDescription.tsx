import { cn } from "~/ui/utils";

export interface SheetDescriptionProps extends React.ComponentProps<"div"> {}

export function SheetDescription({
  className,
  ...props
}: SheetDescriptionProps) {
  return (
    <div
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}
