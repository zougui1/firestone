import { cn } from "~/ui/utils";

export interface SheetTitleProps extends React.ComponentProps<"div"> {}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <div
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}
